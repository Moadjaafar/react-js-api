import {useEffect, useState} from "react";
import Product from "./Product";

export default function ProductList() {

    const [productsList, setProductsList] = useState([]);
    const [searchIteme, setsearchIteme] = useState([]);
    const [searchCtaegorie, setsearchCtaegorie] = useState([]);
    const [categoriesList, setcategoriesList] = useState([]);


    const displayProducts = ()=> {
        const productsFiltred = productsList.filter( product => {
            console.log(searchCtaegorie);
            return product.title.includes(searchIteme) || product.category.includes(searchCtaegorie);
        });

        if (productsList.length > 0) {
            return productsFiltred.map((product, key) => {
                return <Product product={product} key={key} />;
            });
        } else {
            return <tr>
                <td colSpan={7}>no products</td>
            </tr>
        }
    }
    const displayCatgories = ()=> {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(response => setcategoriesList(response));

        if (categoriesList.length > 0) {
            return categoriesList.map((categorie, index) => {
                return <button key={index} onClick={(e) => hnadlSearch(e, categorie)}>{categorie}</button>;
            });
        } else {
            return <p>
                no catgories found for this page.
            </p>
        }
    }
    const getProduct = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(responce => setProductsList(responce));
    };

    useEffect( () => {
        getProduct()
    }, [] );

    const hnadlSearch = (event, category = null) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const SearchValue = document.getElementById('search').value;
        if (SearchValue) {
            setsearchIteme(SearchValue);
        }
        if (category) {
            setsearchCtaegorie(category);
        }
    };

    return <div className="container">
        <h1>Search</h1>
        <form>
            <div className="form-group">
                <label>Search value</label>
                <input id="search" type="text" className="form-control" placeholder="Search" />
            </div>
            <input type="submit" value="Search" onClick={hnadlSearch}  />

        </form>
        <div className='btn-group'>
            {displayCatgories()}
        </div>
        <h2>Product List</h2>
        <table className="table table-responsive table table-striped ">
            <thead>
            <tr>
                <th scope="col">#ID</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Rating</th>
            </tr>
            </thead>
            <tbody>
            {displayProducts()}
            </tbody>
        </table>
    </div>
}