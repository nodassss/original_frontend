import { useState, useEffect } from "react";
import './App.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";

function Clothes_edit() {
    let history = useHistory();
    const loginUser = useSelector((state)=>state.users.value);

    const clotheItem = useSelector((state)=>state.products.value);

    const [formValues, setFormValues] = useState(clotheItem);
    console.log(formValues);

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value });
    }; 
    const handleSubmit = (e) =>{
      e.preventDefault();
    };

    const [preview, setPreview] = useState(clotheItem.images);
    const handleChangeFile = (e) => {
      console.log(e.target.value);
      const { files,name, value } = e.target;
      setPreview(window.URL.createObjectURL(files[0]),{...preview, [name]: value });
      console.log(preview);
    };

    function deleteImage(){
      const name = 'images';
      const value = [];
      setFormValues({...formValues, [name]: value });
      //console.log(setFormValues)
    }

    //更新処理
    const upURL = "http://127.0.0.1/api/update";
    function updatePost(){
        axios
          .put(upURL, {
            id:clotheItem.id,
            user_id:loginUser.id,
            product_name: formValues.product_name,
            price:formValues.price,
            gender: formValues.gender,
            size: formValues.size,
            condition: formValues.condition,
            message:formValues.message,
            img_path:preview
          })
          .then((res) => {
            if(res.status===200){
                history.push("/list");
            }
          })
          .catch(error => {
                console.log(error);
          });
    }
    

    return  (
      <div  className="formBox">
        <form onSubmit={(e) => handleSubmit(e)}>
        <h2> {loginUser.name}さんログイン中</h2>
          <hr />
          <div className="uiForm">
            <div className="formA">
              <label>商品名</label>
              <input type="text" name="product_name" defaultValue={clotheItem.product_name} onChange={(e)=> handleChange(e)}></input>
            </div> 
            <div className="formA">
              <label>値段（税込）</label>
              <input type="text" name="price" defaultValue={clotheItem.price} onChange={(e)=> handleChange(e)}></input>
            </div>
            <div className="formA">
              <label>ジェンダー</label>
              <select name="gender" defaultValue={clotheItem.gender} onChange={(e)=> handleChange(e)}>
                <option>選んでください</option>
                <option>ウィメンズ</option>
                <option>メンズ</option>
                <option>ユニセックス</option>
              </select>
            </div>
            <div className="formA">
              <label>サイズ</label>
              <select name="size" defaultValue={clotheItem.size} onChange={(e)=> handleChange(e)}>
                <option>選んでください</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>FREE</option>
              </select>
            </div>
            <div className="formA">
              <label>状態</label>
              <select name="condition" defaultValue={clotheItem.condition} onChange={(e)=> handleChange(e)}>
                <option>選んでください</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>
            <div className="formA">
              <label>画像</label>
              <input type="file" name="img_path" onChange={handleChangeFile}></input>
              <img src={preview}/>
              <button type="button" onClick={deleteImage} >削除</button>
            </div>
            
            <div className="formA">
              <label>商品説明</label>
              <input type="text" name="message" defaultValue={clotheItem.message} onChange={(e)=> handleChange(e)}></input>
            </div>
              
          </div>
            <div className="formABtn">
          <button type="button" onClick={updatePost}>更新</button>
          </div>
          </form>
      </div>
      
      );    
}
export default Clothes_edit;

