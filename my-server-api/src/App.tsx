import { CardTravel } from '@material-ui/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Item from './components/Item';
import Cart from './components/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

// Styles
import { Wrapper, StyledButton } from './App.styles';

// Object type
export type CartItemType = {
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: boolean;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://localhost:8000/grocery')).json();


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  //const [items, setItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'grocery',
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((ack: number, items) => ack + items.amount, 0)
  );

  function handleAddToCart(clickedItem: CartItemType) {
    setCartItems(prev => {
      // is the item in the cart?? ==>> only add more, not the item
      const isItemInCart = prev.find(item => item.id == clickedItem.id);

      if (isItemInCart) {
        return prev.map(item => (
          item.id == clickedItem.id && item.stock > 0
            ? { ...item, amount: item.amount + 1, stock: item.stock }
            : item
        ))
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1, stock: item.stock }]
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <br />
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item, i) => (
          <Grid item key={i} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}

      </Grid>
    </Wrapper >
  );
}

export default App;
