<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="selStatus" :placeholder="$t('i18nView.selectPlaceholder')" clearable class="filter-item" >
        <el-option
          v-for="item in optionData.data"
          :key="item.value"
          :label="item.name"
          :value="item.value"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="handleChoose" >{{ $t("messages.resetStatus") }} </el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%"
        @selection-change="handleRowChange"
      >
        <el-table-column
          type="selection"
          align="center"
          width="40px"/>
        <el-table-column
          :label="$t('messages.id')"
          prop="id"
          align="center"
          width="50px"/>
        <el-table-column
          :label="$t('messages.msgType')"
          prop="msgType"
          align="center"
          width="100px"/>
        <el-table-column
          :label="$t('messages.msgSeqNo')"
          prop="msgSeqNo"
          align="center"
          width="100px"/>
        <el-table-column
          :label="$t('messages.msgSource')"
          prop="msgSource"
          align="center"
          width="100px"/>
        <el-table-column
          :label="$t('messages.businessType')"
          prop="businessType"
          align="center"
          width="100px"/>
        <el-table-column
          :label="$t('messages.businessNo')"
          prop="businessNo"
          align="center"
          width="200px"/>
        <el-table-column
          :label="$t('messages.msgBody')"
          prop="msgBody"
          align="center"
          width="200px"/>
        <el-table-column
          :formatter="statusFormatter"
          :label="$t('messages.status')"
          prop="status"
          align="center"
          width="100px"/>
        <el-table-column
          :label="$t('messages.remark')"
          prop="remark"
          align="center"/>
        <el-table-column
          :label="$t('messages.createTime')"
          prop="createTime"
          align="center"
          width="180px"/>
        <el-table-column
          :label="$t('messages.updateTime')"
          prop="updateTime"
          align="center"
          width="180px"/>
      </el-table>
    </el-row>
    <el-col :span="24" class="toolbar pageBar">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getMessage" />
    </el-col>
  </div>
</template>
<script>

import { fetchPage, setMessageStatus } from '@/api/message'
import { fetchEnumObj, fetchEnumList } from '@/api/enums'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // Waves directive

export default {
  components: { Pagination },
  directives: { waves },
  data: () => ({
    selStatus: '',
    currentPage1: 1,
    total: 0,
    page: 1,
    pageSize: 10,
    pageNum: 1,
    statusObj: {},
    tableData: [],
    optionData: [],
    currentRows: [],
    loading: true
  }),
  watch: {
    selStatus(oldValue, newValue) { this.getMessage() }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData: async function() {
      this.statusObj = await fetchEnumObj('MessageStatus')
      this.optionData = await fetchEnumList('MessageStatus')
      this.getMessage()
    },
    //  获取图表列表
    getMessage: function() {
      const para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.selStatus
      }
      this.loading = true
      fetchPage(para).then((res) => {
        if (res.data.success) {
          this.total = res.data.total
          this.currentPage1 = res.data.page
          this.tableData = res.data.rows
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.data.returnMsg,
            type: 'error'
          })
        }
      })
    },
    handleRowChange(val) {
      this.currentRows = val
    },
    handleChoose: function() {
      var ids = []
      if (this.currentRows <= 0) {
        this.$message({
          message: '请选择需要重置的消息',
          type: 'error'
        })
        return false
      }
      for (var i = 0; i < this.currentRows.length; i++) {
        if (this.currentRows[i].status !== -10) {
          this.$message({
            message: '所选message记录中含有状态不为异常结束的记录',
            type: 'error'
          })
          return false
        }
        ids.push(this.currentRows[i].id)
      }
      this.loading = true
      setMessageStatus({ 'taskIds': ids }).then((res) => {
        if (res.data.result) {
          this.getMessage()
        } else {
          this.loading = false
          this.$message({
            message: res.data.returnMsg,
            type: 'error'
          })
        }
      })
    },
    // pageSize改变时
    handleSizeChange(val) {
      this.pageSize = val
      this.getMessage()
    },
    // pageNum改变时
    handleCurrentChange(val) {
      this.pageNum = val
      this.getMessage()
    },
    statusFormatter(row, column) {
      return this.statusObj.data[row.status]
    }
  }

}
</script>
