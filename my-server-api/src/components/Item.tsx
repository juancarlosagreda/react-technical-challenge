import Button from '@material-ui/core/Button';
// Typed object
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image_url} alt={item.productName} />
        <div>
            <h3>{item.productName}</h3>
            <h4>Left in stock: {item.stock}</h4>
            <p>{item.productDescription}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;