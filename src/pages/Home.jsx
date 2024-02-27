import { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import PermanentDrawerLeft from '../components/drawer'
import {Box,  Button, Checkbox, Dialog, DialogContent, Stack, TextField, DialogTitle, DialogActions } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OrdersService from "../services/OrdersService";
import { toast } from 'react-toastify';
import NotificationService from "../services/NotificationService";


function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const columns = [
  {id: 'packageName', name: 'Package Name'},
  {id: 'customerName', name: 'Customer Name'},
  {id: 'tripDate', name: 'Trip Date'},
  {id: 'status', name: 'Status'},
  {id: 'advance', name: 'Advance Payment'},
  {id: 'actions', name: 'Actions'},
];



const makeStyle = (status) => {
  if (status === "Approved") {
    return "bg-green-300 text-green-800";
  } else if (status === "Pending") {
    return "bg-red-200 text-red-800";
  } else {
    return "bg-blue-500 text-white";
  }
};


export const Home = () => {

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchOrders();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [open, openChange] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [userToken, setUserToken] = useState(''); 
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [singleRoomsCount, setSingleRoomsCount] = useState(0);
  const [doubleRoomsCount, setDoubleRoomsCount] = useState(0);
  const [tripleRoomsCount, setTripleRoomsCount] = useState(0);
  const [advancePrice, setAdvancePrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const[discount, setDiscount] = useState(0);
  const[actualPrice, setActualPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (order)=>{
    setIsEdit(true);
    openPopUp();

    try{
      setOrderId(order._id);
        setChildCount(order.noOfPeople.children);
        setAdultCount(order.noOfPeople.adults);
        setSingleRoomsCount(order.rooms.single);
        setDoubleRoomsCount(order.rooms.double);
        setTripleRoomsCount(order.rooms.triple); 
        setUserToken(order.userDeviceToken);

        if(order.price.finalPrice){
          setFinalPrice(order.price.finalPrice); 
          setAdvancePrice(order.advance.amount);
          setDiscount(order.price.discount);
          setActualPrice(order.price.shownPrice);
        }else{
          setFinalPrice(0);
          setAdvancePrice(0);
          setDiscount(0);
          setActualPrice(0);
        }
      
    }catch(error){
      console.error('Error fetching hotel details:', error);
    }

  }

  const openPopUp = ()=>{ 
    openChange(true);
  }

  const closePopUp = ()=>{
    openChange(false);
  }

  async function fetchOrders() {
    try{
      const data = await OrdersService.getOrders();
      console.log('Data are: ', data);
      setOrders(data);
    }catch(error){
      console.log('Error fetching orders: ', error);
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if (actualPrice !== 0 && discount !== 0 && advancePrice !== 0) {
      try {
        setLoading(true);
        await OrdersService.updateOrderPrices(actualPrice, discount, advancePrice, finalPrice, orderId);  
        await OrdersService.updateOrderStatus(orderId);
        await NotificationService.sendOrderConfirmationNotification(userToken);
        console.log("Updated");
        toast.success("Updated succesfully ");
        closePopUp();
        fetchOrders();
      } catch(err) {
        toast.error("Error updating price, error: " + err);
        setLoading(false);
      }
    } else {
      toast.error("Please enter all relevant price fields");
      console.error("Please enter all relevant price fields");
    }

  }


  const handleActualPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setActualPrice(price);
    const finalPrice = price - discount;
    setFinalPrice(finalPrice);
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value);
    setDiscount(discount);
    const finalPrice = actualPrice - discount;
    setFinalPrice(finalPrice);
  };

  

  return (
    <> 
     <Box sx={{ display: 'flex' }}>
      <div className="Table">
      <h3 className="pb-5">Recent Orders</h3>
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-max" style={{border: '1px solid #D4D4D4', color: '#262626'}} >
          <TableHead >
            <TableRow style={{backgroundColor: '#D4D4D4'}}>
              {columns.map((column)=>(
                <TableCell key={column.id} style={{color: '#262626', fontSize: '18px', fontWeight: 600}}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.packageId.roundTrip.packageName}</TableCell>
                <TableCell align="left">{order.customerId}</TableCell>
                <TableCell align="left">{order.tripDate}</TableCell>
                <TableCell align="left">
                  <span 
                    className={`py-1 px-3 rounded-full ${makeStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  {order.advance.isPaid ? "Done" : "Not Paid"} 
                </TableCell>
                <TableCell>
                <Button variant='contained' onClick={e=>{handleEdit(order)}} color='primary' sx={{margin: '5px'}} >{order.price.finalPrice ? 'See Prices' : 'Add Prices'}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={closePopUp} fullWidth maxWidth='sm' >
      <DialogTitle>
        <span>Order Information</span>
      </DialogTitle> 
      <DialogContent> 
        <form onSubmit={handleSubmit} > 
          <Stack spacing={2} margin={2}>

          <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Number of adults
      </label>
      <TextField value={adultCount} variant='outlined' ></TextField> 
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Number of children
      </label>
      <TextField value={childCount} variant='outlined'></TextField>    </div>
  </div>


  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Number of single rooms
      </label>
      <TextField value={singleRoomsCount} variant='outlined'></TextField>    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Number of double rooms
      </label>
      <TextField value={doubleRoomsCount} variant='outlined'></TextField>    
      </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Number of triple rooms
      </label>
      <TextField value={tripleRoomsCount}  variant='outlined'></TextField>
      </div>
  </div>

<p className="pt-5">Final Prices</p>
  <div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
       Actual Price ($)
      </label>
      <TextField variant='outlined' value={finalPrice} onChange={handleActualPriceChange} ></TextField>   
       </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
       Discount ($)
      </label>
      <TextField variant='outlined' value={discount} onChange={handleDiscountChange}></TextField>   
       </div>
    <div class="w-full md:w-1/2 px-3 py-4">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Final Price ($)
      </label>
      <TextField variant='outlined' value={finalPrice} disabled={true} ></TextField>    
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 py-4">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      Advance Price ($)
      </label>
      <TextField variant='outlined' value={advancePrice} onChange={(e) => setAdvancePrice(parseFloat(e.target.value))}></TextField>   
       </div> 
  </div>
  

            <Button type='submit' variant='contained' disabled={loading}>Update Prices</Button>
          </Stack>
        </form> 
      </DialogContent>
     </Dialog>

    </div>
     </Box>
     
    </>
  )
}
