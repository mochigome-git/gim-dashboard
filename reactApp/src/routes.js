/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "./layouts/dashboard";
import Coating from "./layouts/coating";
import Resetpassword from "./layouts/authentication/reset-password/cover/index"
import InkjetIndex from "./layouts/inkjet/"
import InkjetWeighing from "./layouts/inkjet/Weighing";
import InkjetFilling from "./layouts/inkjet/Filling";
import ProcurementIndex from "./layouts/procurement"
import ProcurementAddressbook from "./layouts/procurement/addressbook"
import ProcurementCreatepo from "./layouts/procurement/createpo"
import PurchaseOrder from "./layouts/procurement/purchaseorder"
import Rewinding from "./layouts/rewinding"
import Board from "./layouts/rewinding/Board"
//import Billing from "./layouts/billing";
//import Notifications from "./layouts/notifications";
//import Profile from "./layouts/profile";
//import SignIn from "./layouts/authentication/sign-in"

// @mui icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import RealtimeTable from "./layouts/coating/components/RealtimeTable";

const routes = [
//General 
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "",
    name: "Reset",
    key: "reset",
    icon: <LoginIcon fontSize="small" />,
    route: "/authentication/reset-password",
    component: <Resetpassword />,
  },

//Coating block
  {
    type: "collapse",
    name: "Coating",
    key: "coating",
    icon: <BackupTableIcon fontSize="small" />,
    route: "/coating",
    component: <Coating />,
  }, 
  {
    type: "",
    name: "Coating Realtime",
    key: "Coating-Realtime",
    route: "/coating/realtime",
    component: <RealtimeTable/>,
  },

  
//Inkjet block  
  {
    type: "collapse",
    name: "Inkjet",
    key: "inkjet",
    icon: <ReceiptLongIcon fontSize="small" />,
    route: "/inkjet",
    component: <InkjetIndex />,
  },
  {
    type: "",
    name: "Inkjet Weighing",
    key: "inkjet/weighing",
    icon: <ReceiptLongIcon fontSize="small" />,
    route: "/inkjet/weighing",
    component: <InkjetWeighing />,
  },
  {
    type: "",
    name: "Inkjet Filling",
    key: "inkjet/filling",
    icon: <ReceiptLongIcon fontSize="small" />,
    route: "/inkjet/filling",
    component: <InkjetFilling />,
  },

//Rewinding block
  {
    type: "collapse",
    name: "Rewinding",
    key: "Rewinding",
    icon: <CameraRollIcon fontSize="small" />,
    route: "/rewinding",
    component: <Rewinding />,
  },
  {
    type: "",
    name: "Rewinding Board",
    key: "Rewinding-Board",
    route: "/rewinding/board",
    component: <Board />,
  },

//Procurement block
  {
    type: "collapse",
    name: "Procurement",
    key: "procurement",
    icon: <ShoppingCartIcon fontSize="small" />,
    route: "/procurement",
    component: <ProcurementIndex />,
  },
  {
    type: "",
    name: "Procurement Create Po",
    key: "Create-PO",
    route: "/procurement/create-po",
    component: <ProcurementCreatepo />,
  },
  {
    type: "",
    name: "Procurement AddressBook",
    key: "Address-Book",
    route: "/procurement/address-book",
    component: <ProcurementAddressbook />,
  },
  {
    type: "",
    name: "Procurement PurchaseOrder",
    key: "Purchase-Order",
    route: "/procurement/purchase-order-list",
    component: <PurchaseOrder />,
  }



  /*{
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <ReceiptLongIcon fontSize="small"/>,
    route: "/billing",
    component: <Billing />,
  },*/
  /*{
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <NotificationsIcon fontSize="small"/>,
    route: "/notifications",
    component: <Notifications />,
  },*/
  /*{
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <PersonIcon fontSize="small"/>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <LoginIcon fontSize="small"/>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },*/
];

export default routes;