import { useState } from "react";
import './App.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


function Register() {
    let history = useHistory();
    
    const initialValues = {username: "", email: "", password: "", passwordConfirm: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
      console.log(e.target.value);
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value });
      // console.log(formValues);
    };
    
      const handleSubmit = (e) =>{
        e.preventDefault();
        //登録情報を送信する。
        //バリデーションチェックをする。
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      };

    const validate = (values) => {
      console.log(values);
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
        if(!values.passwordConfirm) {
          errors.passwordConfirm = "パスワードを入力してください";
        }else if (values.password != values.passwordConfirm) {
          errors.passwordConfirm = "パスワードが正しくありません";
        }
        return errors;
      };


      const baseURL = "http://127.0.0.1/api/register";
      function createPost() {
        axios
          .post(baseURL, {
            name: formValues.username ,
            email: formValues.email,
            password: formValues.password,
          }).then((response) => {
            console.log(response)
            setFormValues(response.data);
            if(response.status===200){
              history.push("/");
            }
          })
      }


  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>スタッフ登録</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>名前</label>
            <input type="text" placeholder="ユーザー名" name="username"  onChange={(e)=> handleChange(e)} />
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

          <div className="formField">
            <label>パスワード確認</label>
            <input type="password" placeholder="パスワード確認" name="passwordConfirm" onChange={(e)=> handleChange(e)} />
          </div>
          <p className="errorMsg">{formErrors.passwordConfirm}</p>

          <button className="signupButton" onClick={createPost} >登録</button>
        </div>
      </form>
    </div>
  );
}
export default Register;
