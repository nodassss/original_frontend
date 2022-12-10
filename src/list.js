import { useState, useEffect } from "react";
import './List.css';
import { useHistory} from 'react-router-dom';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addProduct} from "./features/products";


function List() {
  let history = useHistory();
  const dispatch = useDispatch();

  const loginUser = useSelector((state)=>state.users.value);

  
  const [clothes, setClothes] = useState([]);
  // console.log(clothes);
  const getURL = "http://127.0.0.1/api/index";
  useEffect(() => { getClothesData(); },[])   //画面に到着したらgetClothesDataを呼ぶ
  const getClothesData = () => {
    axios
    .get(getURL).then(response => {
      setClothes(response.data);
      console.log(response.data);  //取得データ確認
    })
    .catch(() => {
      console.log('通信に失敗しました');
    });
  }

  const deleteURL = "http://127.0.0.1/api/delete";      //削除
  function deleteClick(clothe){
    if(!window.confirm('本当に削除しますか？')){
       window.alert('キャンセルされました'); 
       return false;
    }
    axios
    .post(deleteURL, {
      id: clothe.id
    })
    .then((res) => {
      setClothes(res.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  function handleClick() {             //登録ボタン処理
    history.push("/clothes_register");
  }
  
  function editClick(clothe) {         //編集ボタン処理
    console.log(clothe);
    
    dispatch(
      addProduct({
      id:           clothe.id,
      user_id:      clothe.user_id,
      product_name: clothe.product_name,
      price:        clothe.price,
      gender:       clothe.gender,
      size:         clothe.size,
      condition:    clothe.condition,
      message:      clothe.message,
      images:       clothe.images,
      
      }),
      
    );
    
    history.push("/clothes_edit");
  }

  const baseURL = "http://127.0.0.1/api/logout";            //ログアウト
  function handleLogout() {
    axios
    .post(baseURL).then(res => {
      console.log(res)
      if (res.data.status === 200) {
        history.push("/");    
      } 
    });
  }

    return  (
      <div  className="">
        <form>
        <h2>{loginUser.id} : {loginUser.name}さんログイン中</h2>
        <hr />
        <div className="">
          {clothes.map((clothe) => {
          return (
            <div className="listBlock" key={clothe.id}>
              { clothe.id }
              商品名: { clothe.product_name }
              : { clothe.price }円
              : { clothe.gender }
              : { clothe.size }
              : { clothe.condition }
              : { clothe.message }
              
              
              <button type="button" onClick={() => {editClick(clothe)}} key={clothe.id} >編集</button>
              <button type="button" onClick={() => {deleteClick(clothe)}} >削除</button>
            </div>
          )
          })}
          {/* {img.map((image) => {
          return (
            <div className="listBlock" key={ image.id }>
              { image.img_path }
            </div>
          )
          })} */}
        </div>
          <div className="">
            <button type="button" onClick={handleClick}>商品登録</button>
          </div>
          <div className="">
          <button type="button" onClick={handleLogout}>ログアウト</button>
          </div>
          </form>
      </div>
      );    
}
export default List;
