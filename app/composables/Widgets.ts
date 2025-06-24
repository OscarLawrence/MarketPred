
import { WidgetGroups } from '~/config'

export const useWidgets = () => {




    const availableWidgets = {
        'Chart': defineAsyncComponent(() => import('@/components/Widgets/TradingView/TradingViewChart.vue')),
    }



    return { availableWidgets }
}