<template>
  <page-list
    :list="list"
    :columns="columns"
    :single-actions="singleActions"
    :group-actions="groupActions" />
</template>

<script>
import * as R from 'ramda'
import ColumnsMixin from '../mixins/columns'
import SingleActionsMixin from '../mixins/singleActions'
import ListMixin from '@/mixins/list'
import WindowsMixin from '@/mixins/windows'
import { getNameFilter } from '@/utils/common/tableFilter'

export default {
  name: 'LoadbalancerbackendList',
  mixins: [WindowsMixin, ListMixin, ColumnsMixin, SingleActionsMixin],
  props: {
    id: String,
    getParams: {
      type: [Function, Object],
    },
    data: { // 后端服务器组的数据
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      list: this.$list.createList(this, {
        id: this.id,
        resource: 'loadbalancerbackends',
        getParams: this.getParam,
        filterOptions: {
          name: getNameFilter(),
        },
      }),
      groupActions: [
        {
          label: '新建',
          permission: 'lb_loadbalancerbackends_create',
          action: () => {
            const w100Providers = ['aliyun', 'huawei', 'qcloud', 'aws']
            let maxWeight = 256
            if (this.data && this.data.provider) {
              if (w100Providers.includes(this.data.provider.toLowerCase())) {
                maxWeight = 100
              }
            }
            this.createDialog('LoadbalancerbackendCreateDialog', {
              title: '新建',
              data: this.list.selectedItems,
              onManager: this.onManager,
              refresh: this.refresh,
              lbBackendgroupData: this.data,
              maxWeight,
            })
          },
          meta: () => {
            return {
              buttonType: 'primary',
              validate: this.$store.getters.isAdminMode,
            }
          },
        },
      ],
    }
  },
  created () {
    this.list.fetchData()
  },
  methods: {
    getParam () {
      const ret = {
        ...(R.is(Function, this.getParams) ? this.getParams() : this.getParams),
      }
      return ret
    },
    handleOpenSidepage (row) {
      this.sidePageTriggerHandle(this, 'LoadbalancerbackendSidePage', {
        id: row.id,
        resource: 'loadbalancerbackends',
        getParams: this.getParam,
      }, {
        list: this.list,
      })
    },
  },
}
</script>