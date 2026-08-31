import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { SiteEnhancements } from "./quartz/plugins/transformers"

const config = await loadQuartzConfig()
config.plugins.transformers.push(SiteEnhancements())
export default config
export const layout = await loadQuartzLayout()
