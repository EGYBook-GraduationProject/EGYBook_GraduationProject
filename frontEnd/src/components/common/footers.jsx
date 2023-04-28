import React, { Component } from "react";
import {Link}               from "react-router-dom";
import $ from "jquery";

//Import Image
import Logo from "../../assets/images/favicon.png"
import Logo2 from "../../assets/images/logo-without-photo.png"
class Footers extends Component {
    //Inherited Parent options.
    constructor(props) {
        super(props);
        this.state = {
            auth_state: null
        };
    }
    fetchData(){
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        if(localStorage.getItem("token")){
          myHeaders.append('Authorization',  `Bearer ${localStorage.getItem("token")}`);
        }
        fetch('http://localhost:8000/backend/plan',{
          method: 'GET',
          headers: myHeaders
        }).then(response => response.json())
          .then(data => {
            this.setState({ 
              auth_state: data
            });
            if(data == "Forbidden"){
                localStorage.removeItem("token")
                this.forceUpdate()
            }
        });
      }
    //Init Js Scripts
    componentDidMount(){
        this.fetchData()
        this.intiScripts();
    }

    intiScripts(){

        $(document).ready(function() {
            //  custom select input
            var x, i, j, l, ll, selElmnt, a, b, c;
            x = document.getElementsByClassName("custom-select");
            l = x.length;
            for (i = 0; i < l; i++) {
                selElmnt = x[i].getElementsByTagName("select")[0];
                ll = selElmnt.length;
                a = document.createElement("DIV");
                a.setAttribute("class", "select-selected");
                a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                b = document.createElement("DIV");
                b.setAttribute("class", "select-items select-hide");
                for (j = 1; j < ll; j++) {
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.addEventListener("click", function(e) {
                        var y, i, k, s, h, sl, yl;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        sl = s.length;
                        h = this.parentNode.previousSibling;
                        for (i = 0; i < sl; i++) {
                            if (s.options[i].innerHTML === this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                yl = y.length;
                                for (k = 0; k < yl; k++) {
                                    y[k].removeAttribute("class");
                                }
                                this.setAttribute("class", "same-as-selected");
                                break;
                            }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                }
                x[i].appendChild(b);
                a.addEventListener("click", function(e) {
                    /*when the select box is clicked, close any other select boxes,
                    and open/close the current select box:*/
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }
            function closeAllSelect(elmnt) {
                var x, y, i, xl, yl, arrNo = [];
                x = document.getElementsByClassName("select-items");
                y = document.getElementsByClassName("select-selected");
                xl = x.length;
                yl = y.length;
                for (i = 0; i < yl; i++) {
                    if (elmnt === y[i]) {
                        arrNo.push(i)
                    } else {
                        y[i].classList.remove("select-arrow-active");
                    }
                }
                for (i = 0; i < xl; i++) {
                    if (arrNo.indexOf(i)) {
                        x[i].classList.add("select-hide");
                    }
                }
            }
            document.addEventListener("click", closeAllSelect);

            // mobile menu
            $('.hamburger').on('click',function (event) {
                $(this).toggleClass('h-active');
                $('.main-nav').toggleClass('slidenav');
            });

            $('.header-home .main-nav ul li  a').on('click',function (event) {
                $('.hamburger').removeClass('h-active');
                $('.main-nav').removeClass('slidenav');
            });

            $(".main-nav .fl").on('click', function(event) {
                var $fl = $(this);
                $(this).parent().siblings().find('.sub-menu').slideUp();
                $(this).parent().siblings().find('.fl').addClass('flaticon-plus').text("+");
                if($fl.hasClass('flaticon-plus')){
                    $fl.removeClass('flaticon-plus').addClass('flaticon-minus').text("-");
                }else{
                    $fl.removeClass('flaticon-minus').addClass('flaticon-plus').text("+");
                }
                $fl.next(".sub-menu").slideToggle();
            });


            //account dropdown
            var accountCard = document.querySelectorAll('.account-dropdown')
            var userIcon = document.querySelectorAll('.user-dropdown-icon i')
            userIcon.forEach((el)=>{
                el.addEventListener('click', ()=>{
                    accountCard.forEach((element)=>{
                        element.classList.toggle("show")
                    })
                })
            });
           
            // $(".dropbtn").addEventListener('click', ()=>{
            //     var btn_id = $(this).attr('id'); //get button id
            //     ctaDropMenu(e)
            //     toggleSigns(btn_id)
            // });
         
            // Search Bar js
            var searchOpen  =  document.querySelectorAll('.searchbar-open i')
            var searchCard  =  document.querySelectorAll('.main-searchbar')
            var searchClose = document.querySelectorAll('.searchbar-close i')
            var searchCard2 = document.querySelectorAll('.main-searchbar2')
            var searchOpen2 = document.querySelectorAll('.searchbar-open2 i')
            var searchClose2= document.querySelectorAll('.searchbar-close2 i')
            var searchCard3 = document.querySelectorAll('.main-searchbar3')
            var searchOpen3 = document.querySelectorAll('.searchbar-open3 i')
            var searchClose3 = document.querySelectorAll('.searchbar-close3 i')
            var searchOpen4 = document.querySelectorAll('.searchbar-open4 i')
            var searchCard4 = document.querySelectorAll('.main-searchbar4')
            var searchClose4 = document.querySelectorAll('.searchbar-close4 i')

            searchOpen.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard.forEach((el)=>{
                        el.classList.add('activeSearch')
                    })
                })
            })
            searchOpen2.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard2.forEach((el)=>{
                        el.classList.add('activeSearch')
                    })
                })
            })
            searchOpen3.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard3.forEach((el)=>{
                        el.classList.add('activeSearch')
                    })
                })
            })
            searchOpen4.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard4.forEach((el)=>{
                        el.classList.add('activeSearch')
                    })
                })
            })
            searchClose.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard.forEach((el)=>{
                        el.classList.remove('activeSearch')
                       
                    })
                })
            });
            searchClose2.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard2.forEach((el)=>{
                        el.classList.remove('activeSearch')
                    })
                })
            });
            searchClose3.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard3.forEach((el)=>{
                        el.classList.remove('activeSearch')
                    })
                })
            });
            searchClose4.forEach((el)=>{
                el.addEventListener('click',()=>{
                    searchCard4.forEach((el)=>{
                        el.classList.remove('activeSearch')
                    })
                })
            });

            window.onclick = function(event){
                searchCard.forEach((el)=>{
                    if(event.target === el){
                        el.classList.remove('activeSearch')
                        var generalSearch = document.getElementById("search");
                        if (generalSearch !== null) {
                            document.getElementById('search').style.display = "block"
                        }
                       
                    }
                }); 
                searchCard2.forEach((el)=>{
                            if(event.target === el){
                                el.classList.remove('activeSearch')
                                var generalSearch = document.getElementById("search");
                        if (generalSearch !== null) {
                            document.getElementById('search').style.display = "block"
                        }
                                
                    }
                });
                searchCard3.forEach((el)=>{
                            if(event.target === el){
                                el.classList.remove('activeSearch')
                                var generalSearch = document.getElementById("search");
                        if (generalSearch !== null) {
                            document.getElementById('search').style.display = "block"
                        }
                              
                    }
                });
                searchCard4.forEach((el)=>{
                            if(event.target === el){
                                el.classList.remove('activeSearch')
                                var generalSearch = document.getElementById("search");
                        if (generalSearch !== null) {
                            document.getElementById('search').style.display = "block"
                        }
                              
                    }
                });
               
                if(!event.target.matches('.user-dropdown-icon i')){
                    accountCard.forEach((element)=>{
                        if(element.classList.contains('activeCard')){
                            element.classList.remove('activeCard')
                        }
                    })
                }
            };

            // sticky navabr js
            $(window).on('scroll',function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 10) {
                    $(".header-area").addClass("sticky");
                } else {
                    $(".header-area").removeClass("sticky");
                }
            });

            $(".preloader").delay(1000).fadeOut("slow");

        });

    }

    //Set data
    componentWillMount() {

    }
    //Un set data
    componentWillUnmount() {

    }
    scrollTop()
    {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        return (
            <>
                {/* ===============  Newsletter area start =============== */}
                <div className="newsletter-area pt-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div >
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ===============  Newsletter area end =============== */}

               
                {/* ==============  Footer area start================= */}
                <div className="footer-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="footer-info">
                                    <div className="footer-logo">
                                        <img src={Logo} alt="" className="img-fluid" />
                                        <img src={Logo2} alt="" className="img-fluid" />
                                    </div>
                                    <p>we provide you with a whole trip starting from booking flights,moving
                                        to booking restaurants,places,cars and Ending with
                                        booking your room in an adorable hotel.<br></br><b>we are happy to be one of our
                                    customers</b></p>
                                   
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-sm-7">
                                        <div className="footer-links">
                                            <h5 className="widget-title">Contact us</h5>
                                            <div className="contact-box">
                                                <span><i className="bx bx-phone" /></span>
                                                <div>
                                                    <a href="">(20) 1xx xxx xxxx</a>
                                                    <a href="">(20) 1xx xxx xxxx</a>
                                                </div>
                                            </div>
                                            <div className="contact-box">
                                                <span><i className="bx bx-mail-send" /></span>
                                                <div>
                                                    <a href="mailto:egybook22@gmail.com">egybook22@gmail.com</a>
                                                </div>
                                            </div>
                                            <div className="contact-box">
                                                <span><i className="bx bx-location-plus" /></span>
                                                <div>
                                                    <Link to={"#"}>Alexandria, Egypt</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-5">
                                        <div className="footer-links">
                                            <h5 className="widget-title">support</h5>
                                            <div className="category-list">
                                                <ul>
                                                    <li>
                                                        <Link to={`${process.env.PUBLIC_URL}/contact`} onClick={this.scrollTop} >Contact us</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`${process.env.PUBLIC_URL}/Faq`} onClick={this.scrollTop} >FAQ</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                    <div className="footer-links ">
                                            <h5 className="widget-title">Follow Us:</h5>
                                            <div class="footer-social-icons">
                                        <ul>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-dribbble" /></Link>
                                            </li>
                                                </ul>
                                            </div>
                                    </div>
                                        </div>
                                       
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="copyrigth-area">
                                    <p>Copyright 2022 <Link to={`#`}>EgyBook</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ==============  Footer area end================= */}
            </>
        );
    }
}

export default Footers;
