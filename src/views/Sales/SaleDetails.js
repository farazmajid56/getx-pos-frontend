import React from 'react'
import { useParams } from 'react-router-dom'
import { getSale } from '../../Services/Sale'

// Here we use Material Ui Components
import {
  Paper,
  Grid,
  CardContent,
  CardActions,
  Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Mail'
import { Phone, House } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import CardHeader from 'components/Card/CardHeader'
import Card from 'components/Card/Card'

function SaleDetail(props) {
  let { id } = useParams('id')
  const [loading, setLoading] = React.useState(true)
  let [data, setData] = React.useState({})
  React.useEffect(() => {
    getSale(id).then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    })

  }, [])

  if (loading) return null;

  return (
    <Grid container>

      <Grid item xs={12} sm={12} md={12}>
        <Card >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Sale Information
            </Typography>
            <List dense={true}>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Email />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Invoice Number"
                />
                <Typography>
                  {data.invoice_no}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Supplier"
                />
                <Typography>
                  {data.contact_name}
                </Typography>
              </ListItem>


              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Phone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Final Total"
                />
                <Typography>
                  {data.final_total}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Transaction Date"
                />
                <Typography>
                  {moment(data.transaction_date).format("h:mm DD-MM-YYYY")}
                </Typography>
              </ListItem>


            </List>
          </CardContent>

        </Card>

      </Grid>
      <br />
      <br />
      <Grid item xs={12} sm={12} md={12}>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardHeader color="primary">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={10} >
                <h4 >Sale Order Products</h4>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={2} >

                                    <Fab onClick={handleAddVariation} style={{ alignSelf: "flex-end" }}>
                                        <Add />
                                    </Fab>

                                </Grid> */}
            </Grid>
          </CardHeader>
          <CardContent >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Default Selling Price</TableCell>
                  <TableCell>Sale Price</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.sale_orders?.map((sale_order, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{sale_order.name}</TableCell>
                      <TableCell>{sale_order.default_sell_price}</TableCell>
                      <TableCell>{sale_order.sell_price}</TableCell>
                      <TableCell>{sale_order.quantity}</TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Total : {data.final_total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>



    </Grid>
  )
}

export default SaleDetail
