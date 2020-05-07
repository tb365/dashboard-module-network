export default {
  created () {
    this.singleActions = [
      {
        label: '删除',
        permission: 'lb_loadbalancerlistenerrules_delete',
        action: (obj) => {
          this.createDialog('DeleteResDialog', {
            vm: this,
            title: '删除',
            name: '转发策略',
            data: [obj],
            columns: this.columns,
            onManager: this.onManager,
          })
        },
        meta: obj => this.$getDeleteResult(obj),
      },
    ]
  },
}