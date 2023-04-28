import React, { Component } from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
    
    
    class Admin extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
           email: null,
           password: null,
           username:null,
           admin_name:null,
           type:"Admin",
           redirect: false,
           isDisabled:true
           //msg:null,
           
          };
          this.submitForm = this.submitForm.bind(this);
      };
      /**   const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [msg, setMsg] = useState('');
        const history = useHistory(); */
    
      handleSubmit = (event) => {
        alert('A form was submitted: ');
        event.preventDefault();
      }

      //////////start of regex ///////
  validateEmail(email){
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if(result===true){
      this.setState({
        emailError:false,
        email:email
      })
    } else{
      this.setState({
        emailError:true
      })
    }
  }
  validatePassword(password){
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
    const result = pattern.test(password);
    if(result===true){
      this.setState({
        passwordError:false,
        password:password
      })
    } else{
      this.setState({
        passwordError:true
      })
    }
  }

/////end of regex///////
    
    
      fetchData() {
        fetch("http://localhost:8000/signup", {
            method: "POST",
            body: JSON.stringify({
               email: this.state.email,
               password: this.state.password,
               username:this.state.username,
               admin_name:this.state.admin_name,
               type:this.state.type
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        // .then(data=>{
        //   this.setState({token: data.accessToken})
        // })
        console.table(this.state.email);
        console.table(this.state.password);
        console.table(this.state.username);
        console.table(this.state.admin_name);
    
      }
    
      componentDidMount() {
    
      }
      setRedirect = () => {
        this.setState({
          redirect: true
       
        })
       
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/registeration' />
        }
      }
    
         ////////////{ Validation }///////////
         handleChange(e){
          const target = e.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
          this.setState({
            [name]: value
          });
          if(e.target.name==='username'){
            if(e.target.value==='' || e.target.value===null ){
              this.setState({
                usernameError:true
              })
            } else {
              this.setState({
                usernameError:false,     
                userName:e.target.value
              })
            }
          }
          if(e.target.name==='admin_name'){
            if(e.target.value==='' || e.target.value===null){
              this.setState({
                admin_nameError:true
              })
            } else {
              this.setState({
                admin_nameError:false,
                admin_name:e.target.value
              })
            }
          }
          if(e.target.name==='email'){
           this.validateEmail(e.target.value);
          }
          if(e.target.name==='password'){
            this.validatePassword(e.target.value);
           }
          
           
         if(this.state.usernameError===false && this.state.admin_nameError===false && 
          this.state.emailError===false && this.state.passwordError===false ) {
            this.setState({
              isDisabled:false
            })
         }
        }
        submitForm(e){
          e.preventDefault();
          const data = {
           userName: this.state.userName,
           admin_name: this.state.admin_name,
           email: this.state.email,
           password: this.state.password,
         
           
          }
          // sendFormData(data).then(res=>{
          //   if(res.status===200){
          //     alert(res.data);
          //     this.props.history.push('/');
          //   }else{
        
          //   } 
          // });
         }


    render() {
     
      
        return (
            <>
                {/* =============== SignIn =============== */}
            
                <form className="form" id="signup-form"  onSubmit={this.setRedirect}>
                      <img src="data:image/png;base64,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" alt=""></img>
                <h3>Sign Up Now </h3>
                <label>it's quick and easy </label>
               

               <div className="form-group">
                <div className="form-label-group">
                  <input type="text2" id="username" name="username"required className="form-control" placeholder="Enter username" onChange={(e)=>{this.handleChange(e)}} />
                  <label htmlFor="firstname"></label>
                  {this.state.usernameError ? <span style={{color: "orangered"}}>Please Enter some value</span> : ''} 
                </div>
              </div>
              

                <div className="form-group">
                <div className="form-label-group">
                  <input type="email2" id="email" name="email" required className="form-control" placeholder="Enter your email" onChange={(e)=>{this.handleChange(e)}} />
                  <label htmlFor="email"></label>
                  {this.state.emailError ? <span style={{color: "orangered"}}>Please Enter valid email address : example@mail.com </span> : ''}
                </div>
              </div> 
             

                   <div className="form-group">
                <div className="form-label-group">
                  <input type="password" id="password" name="password" required className="form-control" placeholder="Password" onChange={(e)=>{this.handleChange(e)}} />
                  <label htmlFor="password"></label>
                  {this.state.passwordError ? <span style={{color: "orangered"}}>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters </span> : ''}
                </div>
              </div>

          
                  <div className="form-group">
                <div className="form-label-group">
                  <input type="text2" id="admin_name" name="admin_name" required className="form-control" placeholder="Admin Name" onChange={(e)=>{this.handleChange(e)}} />
                  <label htmlFor="admin_name"></label>
                  {this.state.admin_nameError ? <span style={{color: "orangered"}}>Please Enter some value</span> : ''}
                </div>
              </div>
              
                <div className="button-container">
                {this.renderRedirect()}
                 <input type="submit" value="Sign up" onClick={() => this.fetchData()} />
                </div>

                <div class="textInHorizontalLine">
                    <span>Already a member?</span>
                </div>
                 <div>
                 <a class="coreRegLinkHighlight" href="registeration">Sign in</a> 
                  <span> using your EgyBook account.</span>
                       
                 </div>
            </form>
         
            </>
        
        );
      
    } 
}


 
export default Admin;