import {useState, useEffect } from "react";
import './App.css';
import { useHistory,useLocation } from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "./features/posts";


function Login() {   
    let history = useHistory();
    const dispatch = useDispatch();

    const initialValues = {username: "", email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [values, setValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    

    
    const handleChange = (e) => {
      // console.log(e.target.value);
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value });
      // console.log(formValues);
    };
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if(!values.username) {
        errors.username = "名前を入力してください";
      }
      if(!values.email) {
        errors.email = "メールアドレスを入力してください";
      }else if (!regex.test(values.email)) {
        errors.email = "正しいメールアドレスを入力してください";
      }
      if(!values.password) {
        errors.password = "パスワードを入力してください";
      } else if (values.password.length < 4) {
        errors.password = "4文字以上15文字以下のパスワードを入力してください";
      } else if (values.password.length > 15) {
        errors.password = "4文字以上15文字以下のパスワードを入力してください";
      }
      return errors;
    };

    function handleClick() {
        history.push("/register");
    }
      // console.log(formValues)
      const baseURL = "http://127.0.0.1/api/login";
      const meURL = "http://127.0.0.1/api/me";
    function loginClick() {
        axios
          .post(baseURL, {
            name: formValues.username,
            email:formValues.email,
            password: formValues.password
          })
          .then((response) => {
            setFormValues(response.data);
            me(response.data)
          })     
    }

    function me(response) {
      // console.log(response)
      axios
        .get(meURL, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          }
        })
        .then((response) => {
          console.log(response)
          setValues(response.data);
          
          dispatch(
            addUser({
            id: response.data.id,
            name:response.data.name,

            })
          );
          if(response.status===200){
            history.push("/list");
          }
        })  
      }
      console.log(values)
      
    return (
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>スタッフログイン</h1>
          <hr />
          <div className="uiForm">
            <div className="formField">
              <label>名前</label>
              <input type="text" placeholder="ユーザー名" name="username" onChange={(e)=> handleChange(e)} />
            </div>
              <p className="errorMsg">{formErrors.username}</p>
            <div className="formField">
              <label>メールアドレス</label>
              <input type="text" placeholder="メールアドレス" name="email" onChange={(e)=> handleChange(e)} />
            </div>
              <p className="errorMsg">{formErrors.email}</p>
            <div className="formField">
              <label>パスワード</label>
              <input type="password" placeholder="パスワード" name="password" onChange={(e)=> handleChange(e)} />
            </div>
              <p className="errorMsg">{formErrors.password}</p>
            <button className="loginButton" onClick={loginClick} >ログイン</button>
          </div>
          <div className="uiFormBtn">
          <button type="button" onClick={handleClick}>スタッフ登録</button>
          </div>
        </form>
      </div>
    );  
    
}
 
export default Login;
