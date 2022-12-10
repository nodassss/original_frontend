import { useState } from "react";
import './App.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useLocation } from "react-router-dom"
import {useSelector} from "react-redux";

function Clothes_register() {
    let history = useHistory();

    const loginUser = useSelector((state)=>state.users.value);
    console.log(loginUser);
    
    const initialValues = {user_id:"", product_name: "", price: "", gender: "", size: "", condition: "", message: "",};
    const [formValues, setFormValues] = useState(initialValues);
    const imgValues = {img_path: ""};
    const [preview, setPreview] = useState(imgValues);
  
    const handleChangeFile = (e) => {
      console.log(e.target.value);
      const { files,name, value } = e.target;
      setPreview(window.URL.createObjectURL(files[0]),{...preview, [name]: value });
      console.log(preview);
      
    };

    const handleChange = (e) => {
      console.log(e.target.value);
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value });
      console.log(formValues);
    };
    const handleSubmit = (e) =>{
      e.preventDefault();
    };

    const baseURL = "http://127.0.0.1/api/create";
    function handleClick() {
      axios
        .post(baseURL, {
          user_id:loginUser.id,
          product_name: formValues.product_name,
          price:formValues.price,
          gender: formValues.gender,
          size: formValues.size,
          condition: formValues.condition,
          message: formValues.message,
          img_path: preview
        })
        .then((response) => {
          console.log(response)
          setFormValues(response.data)
          
          if(response.status===200){
            history.push("/list");
          }
        })  .catch(() => {
          console.log('通信に失敗しました');
      });   
    }

    return  (
      <div className="formBox">
        <form onSubmit={(e) => handleSubmit(e)} >
          <h1> ~登録~ {loginUser.id} : {loginUser.name} さんログイン中 </h1>
          <hr />
          <div className="uiForm">
            <div className="formA">
              <label>商品名</label>
              <input type="text" name="product_name"onChange={(e)=> handleChange(e)}></input>
            </div>
            <div className="formA">
              <label>値段（税込）</label>
              <input type="text" name="price"onChange={(e)=> handleChange(e)}></input>
            </div>
            <div className="formA">
              <label>ジェンダー</label>
              <select  name="gender" onChange={(e)=> handleChange(e)}>
                <option></option>
                <option>ウィメンズ</option>
                <option>メンズ</option>
                <option>ユニセックス</option>
              </select>
            </div>
            <div className="formA">
              <label>サイズ</label>
              <select  name="size" onChange={(e)=> handleChange(e)}>
                <option></option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>FREE</option>
              </select>
            </div>
            <div className="formA">
              <label>状態</label>
              <select  name="condition" onChange={(e)=> handleChange(e)}>
                <option></option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>
            <div className="">
              <div className="formimage">
                <label>画像</label>
                <input type="file"  name="img_path"onChange={handleChangeFile}  ></input>
                <img src={preview} />
              </div>
              
            </div>
            <div className="formA">
              <label>商品説明</label>
              <input type="text" name="message"onChange={(e)=> handleChange(e)}></input>
            </div>
          </div>
            <div className="formABtn">
              <button type="button" onClick={handleClick}>商品登録</button>
            </div>
        </form>
      </div>
    );
      
}
export default Clothes_register;
  