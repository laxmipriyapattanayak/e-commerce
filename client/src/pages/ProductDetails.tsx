import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import  {getSingleProductRequest}  from 'services/ProductService';

interface Product {
    name: string;
    description: string;
    price: number;
    image: string;    
  }

const ProductDetails = () => {
  const {slug} = useParams();
  const [product, setProduct] = useState<Product>({
      name: '',
      description: '',
      price: 0,
      image:'image',
    });
  const imageUrl = 'http://localhost:4000/product/image/'

  const fetchProductDetails = async () => {
      try {
          const result = await getSingleProductRequest(slug);
          setProduct(result.product);
      } catch (error: any) {
          toast.error(error.response.data.message)
      }
  };
  useEffect(() => {
      fetchProductDetails()
  }, []);

  return (
    <div >
       {product && (
            <div className='product'>
            <img  className='image' src={`${imageUrl}${product.image}`} alt={product.name}/>
            <h2> { product.name } </h2>
            <p> { product.description} </p>
            <p> price: { product.price } DKK</p>
            <button>add to cart</button>
            </div>
        )} 
    </div>
  )
}

export default ProductDetails