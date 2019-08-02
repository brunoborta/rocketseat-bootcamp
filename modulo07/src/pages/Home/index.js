import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

function Home() {
  const amount = useSelector(state =>
    state.cart.reduce((result, product) => {
      result[product.id] = product.amount;
      return result;
    }, {})
  );
  const dispatch = useDispatch();

  // state = {
  //   products: [],
  // };
  const [products, setProducts] = useState([]);

  // async componentDidMount() {
  //   const response = await api.get('products');

  //   const products = response.data.map(product => ({
  //     ...product,
  //     formattedPrice: formatPrice(product.price),
  //   }));

  //   this.setState({ products });
  // }
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

// const mapStateToProps = state => ({
//   amount: state.cart.reduce((result, product) => {
//     result[product.id] = product.amount;
//     return result;
//   }, {}),
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(CartActions, dispatch);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default Home;
