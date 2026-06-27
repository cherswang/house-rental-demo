const express = require('express');
const router = express.Router();
const db = require('../database/database');

// 获取所有预约
router.get('/', (req, res) => {
    try {
        const { status, date, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        let sql = 'SELECT * FROM appointments WHERE 1=1';
        const params = [];
        
        if (status) {
            sql += ' AND status = ?';
            params.push(status);
        }
        
        if (date) {
            sql += ' AND appointment_date = ?';
            params.push(date);
        }
        
        // 获取总数
        const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
        const countResult = db.prepare(countSql).get(...params);
        const total = countResult.total;
        
        // 获取分页数据
        sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        
        const appointments = db.prepare(sql).all(...params);
        
        res.json({
            success: true,
            data: appointments,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('获取预约列表失败:', error);
        res.status(500).json({
            success: false,
            message: '获取预约列表失败',
            error: error.message
        });
    }
});

// 获取单个预约详情
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: '预约不存在'
            });
        }
        
        res.json({
            success: true,
            data: appointment
        });
    } catch (error) {
        console.error('获取预约详情失败:', error);
        res.status(500).json({
            success: false,
            message: '获取预约详情失败',
            error: error.message
        });
    }
});

// 创建新预约
router.post('/', (req, res) => {
    try {
        const { name, phone, email, appointment_date, message } = req.body;
        
        // 验证必填字段
        if (!name || !phone || !appointment_date) {
            return res.status(400).json({
                success: false,
                message: '姓名、电话和预约日期为必填项'
            });
        }
        
        // 验证电话格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: '请输入有效的手机号码'
            });
        }
        
        // 验证邮箱格式（如果提供）
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: '请输入有效的邮箱地址'
                });
            }
        }
        
        // 插入数据
        const stmt = db.prepare(`
            INSERT INTO appointments (name, phone, email, appointment_date, message)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(name, phone, email, appointment_date, message);
        
        // 获取插入的数据
        const newAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);
        
        res.status(201).json({
            success: true,
            message: '预约成功',
            data: newAppointment
        });
    } catch (error) {
        console.error('创建预约失败:', error);
        res.status(500).json({
            success: false,
            message: '创建预约失败',
            error: error.message
        });
    }
});

// 更新预约状态
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // 验证状态值
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: '无效的状态值'
            });
        }
        
        // 检查预约是否存在
        const existingAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        if (!existingAppointment) {
            return res.status(404).json({
                success: false,
                message: '预约不存在'
            });
        }
        
        // 更新状态
        const stmt = db.prepare(`
            UPDATE appointments 
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        
        stmt.run(status, id);
        
        // 获取更新后的数据
        const updatedAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        
        res.json({
            success: true,
            message: '状态更新成功',
            data: updatedAppointment
        });
    } catch (error) {
        console.error('更新预约状态失败:', error);
        res.status(500).json({
            success: false,
            message: '更新预约状态失败',
            error: error.message
        });
    }
});

// 更新预约信息
router.put('/:id/details', (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, appointment_date, message } = req.body;
        
        // 检查预约是否存在
        const existingAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        if (!existingAppointment) {
            return res.status(404).json({
                success: false,
                message: '预约不存在'
            });
        }
        
        // 更新信息
        const stmt = db.prepare(`
            UPDATE appointments 
            SET name = ?, phone = ?, email = ?, appointment_date = ?, message = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        
        stmt.run(
            name || existingAppointment.name,
            phone || existingAppointment.phone,
            email || existingAppointment.email,
            appointment_date || existingAppointment.appointment_date,
            message || existingAppointment.message,
            id
        );
        
        // 获取更新后的数据
        const updatedAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        
        res.json({
            success: true,
            message: '预约信息更新成功',
            data: updatedAppointment
        });
    } catch (error) {
        console.error('更新预约信息失败:', error);
        res.status(500).json({
            success: false,
            message: '更新预约信息失败',
            error: error.message
        });
    }
});

// 删除预约
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // 检查预约是否存在
        const existingAppointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        if (!existingAppointment) {
            return res.status(404).json({
                success: false,
                message: '预约不存在'
            });
        }
        
        // 删除预约
        db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
        
        res.json({
            success: true,
            message: '预约删除成功'
        });
    } catch (error) {
        console.error('删除预约失败:', error);
        res.status(500).json({
            success: false,
            message: '删除预约失败',
            error: error.message
        });
    }
});

module.exports = router;