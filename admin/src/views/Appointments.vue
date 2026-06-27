<template>
  <div class="appointments-container">
    <!-- 顶部导航栏 -->
    <div class="header">
      <h1>预约管理</h1>
      <div class="user-info">
        <span>{{ username }}</span>
        <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="全部状态" clearable style="width: 150px">
            <el-option label="待确认" value="pending"></el-option>
            <el-option label="已确认" value="confirmed"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="已取消" value="cancelled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="filterForm.date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            style="width: 200px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadAppointments">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 预约列表表格 -->
    <el-card class="table-card">
      <el-table :data="appointments" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
          <template #default="scope">
            {{ scope.row.email || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="appointment_date" label="预约日期" width="120"></el-table-column>
        <el-table-column prop="message" label="留言" min-width="150">
          <template #default="scope">
            {{ scope.row.message || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="viewDetail(scope.row)">详情</el-button>
            <el-button size="small" type="warning" @click="editStatus(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteAppointment(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pagination.limit"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          background
        ></el-pagination>
      </div>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog title="预约详情" v-model="detailDialogVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="ID">{{ detailData.id }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ detailData.name }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ detailData.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ detailData.email || '-' }}</el-descriptions-item>
        <el-descriptions-item label="预约日期">{{ detailData.appointment_date }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(detailData.status)">
            {{ getStatusText(detailData.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="留言" :span="2">{{ detailData.message || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detailData.created_at }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detailData.updated_at }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑状态对话框 -->
    <el-dialog title="编辑预约状态" v-model="editDialogVisible" width="500px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="预约ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="预约日期">
          <el-date-picker
            v-model="editForm.appointment_date"
            type="date"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="待确认" value="pending"></el-option>
            <el-option label="已确认" value="confirmed"></el-option>
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="已取消" value="cancelled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言">
          <el-input v-model="editForm.message" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateAppointment">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

export default {
  name: 'Appointments',
  setup() {
    const router = useRouter()
    const username = ref(localStorage.getItem('username') || '管理员')
    const loading = ref(false)
    const appointments = ref([])
    const detailDialogVisible = ref(false)
    const editDialogVisible = ref(false)

    const filterForm = reactive({
      status: '',
      date: ''
    })

    const pagination = reactive({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    })

    const detailData = ref({})
    const editForm = reactive({
      id: '',
      name: '',
      phone: '',
      email: '',
      appointment_date: '',
      status: '',
      message: ''
    })

    // 状态映射
    const statusMap = {
      pending: { text: '待确认', type: 'warning' },
      confirmed: { text: '已确认', type: 'success' },
      completed: { text: '已完成', type: 'info' },
      cancelled: { text: '已取消', type: 'danger' }
    }

    const getStatusText = (status) => {
      return statusMap[status]?.text || status
    }

    const getStatusType = (status) => {
      return statusMap[status]?.type || ''
    }

    // 加载预约列表
    const loadAppointments = async () => {
      loading.value = true
      try {
        const params = {
          page: pagination.page,
          limit: pagination.limit
        }

        if (filterForm.status) {
          params.status = filterForm.status
        }

        if (filterForm.date) {
          params.date = filterForm.date
        }

        const response = await axios.get('/api/appointments', { params })
        
        if (response.data.success) {
          appointments.value = response.data.data
          pagination.total = response.data.pagination.total
          pagination.totalPages = response.data.pagination.totalPages
        }
      } catch (error) {
        ElMessage.error('加载预约列表失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    // 重置筛选
    const resetFilter = () => {
      filterForm.status = ''
      filterForm.date = ''
      pagination.page = 1
      loadAppointments()
    }

    // 分页处理
    const handlePageChange = (page) => {
      pagination.page = page
      loadAppointments()
    }

    const handleSizeChange = (size) => {
      pagination.limit = size
      pagination.page = 1
      loadAppointments()
    }

    // 查看详情
    const viewDetail = (row) => {
      detailData.value = row
      detailDialogVisible.value = true
    }

    // 编辑状态
    const editStatus = (row) => {
      editForm.id = row.id
      editForm.name = row.name
      editForm.phone = row.phone
      editForm.email = row.email || ''
      editForm.appointment_date = row.appointment_date
      editForm.status = row.status
      editForm.message = row.message || ''
      editDialogVisible.value = true
    }

    // 更新预约
    const updateAppointment = async () => {
      try {
        // 更新状态
        await axios.put(`/api/appointments/${editForm.id}`, {
          status: editForm.status
        })

        // 更新详细信息
        await axios.put(`/api/appointments/${editForm.id}/details`, {
          name: editForm.name,
          phone: editForm.phone,
          email: editForm.email,
          appointment_date: editForm.appointment_date,
          message: editForm.message
        })

        ElMessage.success('更新成功')
        editDialogVisible.value = false
        loadAppointments()
      } catch (error) {
        ElMessage.error('更新失败')
        console.error(error)
      }
    }

    // 删除预约
    const deleteAppointment = async (row) => {
      try {
        await ElMessageBox.confirm('确定要删除这个预约吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        await axios.delete(`/api/appointments/${row.id}`)
        ElMessage.success('删除成功')
        loadAppointments()
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('删除失败')
          console.error(error)
        }
      }
    }

    // 退出登录
    const handleLogout = () => {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('username')
      router.push('/login')
    }

    // 初始化加载
    onMounted(() => {
      loadAppointments()
    })

    return {
      username,
      loading,
      appointments,
      filterForm,
      pagination,
      detailDialogVisible,
      editDialogVisible,
      detailData,
      editForm,
      getStatusText,
      getStatusType,
      loadAppointments,
      resetFilter,
      handlePageChange,
      handleSizeChange,
      viewDetail,
      editStatus,
      updateAppointment,
      deleteAppointment,
      handleLogout
    }
  }
}
</script>

<style scoped>
.appointments-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-bar {
  padding: 20px;
  background: white;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-card {
  margin: 20px;
  flex: 1;
  overflow: auto;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>