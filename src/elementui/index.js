import {
  Button,
  Row,
  Container,
  Header,
  Aside,
  Main,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Message,
  Popover,
  Slider,
  Drawer,
} from 'element-ui'
export default {
  install(Vue){
    Vue.use(Button)
    Vue.use(Row)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Col)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Popover)
    Vue.use(Slider)
    Vue.use(Drawer)

    Vue.prototype.$message = Message
  }
}
