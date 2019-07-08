import Vue from 'vue'
import {
  Transfer,
  Select,
  Button,
  Row,
  Col,
  Table,
  Icon,
  Input,
  Layout,
  Menu,
  Alert,
  Tooltip,
  List,
  Tag,
  Form
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const { TextArea } = Input
const { Header, Content } = Layout
const { Item } = Menu
const { Item: ListItem } = List
const { Item: FormItem } = Form

Vue.component(FormItem.name, FormItem)
Vue.component(Form.name, Form)

Vue.component(Tag.name, Tag)

Vue.component(List.name, List)
Vue.component(ListItem.name, ListItem)

Vue.component(Tooltip.name, Tooltip)

Vue.component(Alert.name, Alert)

Vue.component(Layout.name, Layout)
Vue.component(Header.name, Header)
Vue.component(Content.name, Content)

Vue.component(Menu.name, Menu)
Vue.component(Item.name, Item)

Vue.component(Icon.name, Icon)

Vue.component(Table.name, Table)

Vue.component(Table.Column.name, Table.Column)

Vue.component(Transfer.name, Transfer)

Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)

Vue.component(Button.name, Button)

Vue.component(Input.name, Input)
Vue.component(TextArea.name, TextArea)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
