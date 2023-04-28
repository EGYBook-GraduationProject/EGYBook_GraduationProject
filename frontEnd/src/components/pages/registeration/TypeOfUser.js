import React, { Component } from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
class TypeOfUser extends Component {
  

    constructor(props) {
        super(props);
        this.state = {
            count: 1
            
        };
    }

  

    render() {
     
      
        return (
            <>
                {/* =============== TypeOf User =============== */}
            
                <div className="form">
               <img src="data:image/png;base64,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" alt=""></img>
               {/* <div class="col-lg-4 col-md-6 col-sm-12"> */}
                   {/* <div class="contact-card">
                   <div class="contact-icon">
                   <i class="flaticon-thumbs-up"></i></div>
                   <div class="contact-info"><h5>Admin</h5>
                   {/* <ul class="contact-icons"><li><a href="admin">
         </a></li> */}
                       {/* </ul></div></div></div> */} 
               
               <a data-baseweb="link" href="tourist" target="_self" aria-label="Sign up as a Tourist"
                data-tracking-name="_df920f60-6b89-4d30-b760-f5c70aab5461_cta.childNodes[0].link_cta1"
                 class="bu bv gw bw gx c8 c9 ca cb cc cd ce cf cg ch ci cj ck cl gy cn"><div class="fg fh"></div>
                 <div class="bn fi et bp bo">
                     <h2 data-baseweb="typo-headingxlarge" class="gz bv bw h0 h1">Sign up as a Tourist</h2>
                     <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                         <path d="M22.2 12l-6.5 9h-3.5l5.5-7.5H2v-3h15.7L12.2 3h3.5l6.5 9z" fill="currentColor">
                             </path></svg></div><div class="fj"><p data-baseweb="typo-paragraphmedium" class="bu bv h2 d9 fa"></p>
                             </div></a>

                             <a data-baseweb="link" href="tourGuide" target="_self" aria-label="Sign up as a Tourguide"
                data-tracking-name="_df920f60-6b89-4d30-b760-f5c70aab5461_cta.childNodes[0].link_cta1"
                 class="bu bv gw bw gx c8 c9 ca cb cc cd ce cf cg ch ci cj ck cl gy cn"><div class="fg fh"></div>
                 <div class="bn fi et bp bo">
                     <h2 data-baseweb="typo-headingxlarge" class="gz bv bw h0 h1">Sign up as a Tourguide</h2>
                     <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                         <path d="M22.2 12l-6.5 9h-3.5l5.5-7.5H2v-3h15.7L12.2 3h3.5l6.5 9z" fill="currentColor">
                             </path></svg></div><div class="fj"><p data-baseweb="typo-paragraphmedium" class="bu bv h2 d9 fa"></p>
                             </div></a>

                             <a data-baseweb="link" href="admin" target="_self" aria-label="Sign up as an admin"
                data-tracking-name="_df920f60-6b89-4d30-b760-f5c70aab5461_cta.childNodes[0].link_cta1"
                 class="bu bv gw bw gx c8 c9 ca cb cc cd ce cf cg ch ci cj ck cl gy cn"><div class="fg fh"></div>
                 <div class="bn fi et bp bo">
                     <h2 data-baseweb="typo-headingxlarge" class="gz bv bw h0 h1">Sign up as an admin</h2>
                     <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                         <path d="M22.2 12l-6.5 9h-3.5l5.5-7.5H2v-3h15.7L12.2 3h3.5l6.5 9z" fill="currentColor">
                             </path></svg></div><div class="fj"><p data-baseweb="typo-paragraphmedium" class="bu bv h2 d9 fa"></p>
                             </div></a>
            </div>
         
            </>
        
        );
      
    } 
}


 
export default TypeOfUser;