/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
// import ProductFilter from './productFilter.jsx';
import React from 'react';
import ProductTable from './productTable.jsx';
import ProductAdd from './productAdd.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }


  componentDidMount() {
    document.forms.ProductAdd.price.value = '$';
    this.loadData();
  }

  async loadData() {
    const query = `query{
              productList{
                  id Name Price Image Category
              }
          }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const newProduct = product;
    const query = `mutation {
              productAdd(product:{
                Name: "${newProduct.Name}",
                Price: ${newProduct.Price},
                Image: "${newProduct.Image}",
                Category: ${newProduct.Category},
              }) {
                _id
              }
            }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    this.loadData();
  }

  async deleteProduct(id) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    // // const { products } = this.state;
    // // const { location: { pathname, search }, history } = this.props;
    // // const { id } = issues[index];
    const variables = { id };
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    alert('Product deleted product successfully!');
    this.loadData();
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>My Company Inventory</h1>
        <div>Showing all available products</div>
        <hr />
        <br />
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <br />
        <div>Add a new product to inventory</div>
        <hr />
        <br />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}
