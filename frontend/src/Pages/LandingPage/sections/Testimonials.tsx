import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow><GoArrowRight size={35} color='#000'/></NextArrow>,
        prevArrow: <PrevArrow><GoArrowLeft size={35} color='#000'/></PrevArrow>
      };

  return (
    <div className='w-full bg-slate-100 py-10'>
        <h1 className='mt-8 font-bold text-5xl text-center'>What People Say</h1>
        <div className='w-[65vw] h-[50vh] flex justify-cente items-center mt-20 px-5 relative left-80'>
            <div className='h-full w-1/2 flex justify-center items-center'>
                <Carousel {...settings} className='h-[47vh]'>
                    <div className='h-full w-80 z-50 px-8'>
                    <svg width="70px" height="70px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#1e40af" strokeWidth="2"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g></svg><br></br>
                        <p className='px-2'>Raahi transformed my career with invaluable mentor insights and rapid growth.<br></br><br></br> 
                        <span className='text-lg font-semibold text-blue-800'>Diane Rowler</span> 
                        <br></br> <span className='text-slate-400'>Mumbai, Maharashtra</span>
                        </p>
                    </div>
                    <div className='h-full w-80 z-50 px-8'>
                    <svg width="70px" height="70px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#1e40af" strokeWidth="2"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g></svg><br></br>
                        <p className='px-2'>Thanks to Raahi found a mentor who offered tailored advice, greatly empowering my career.<br></br><br></br> 
                        <span className='text-lg font-semibold text-blue-800'>Jashwanth Rathee</span> 
                        <br></br> <span className='text-slate-400'>Allapuzha, Kerala</span>
                        </p>
                    </div>
                    <div className='h-full w-80 z-50 px-8'>
                    <svg width="70px" height="70px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#1e40af" strokeWidth="2"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g><g id="SVGRepo_iconCarrier"> <g><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path> </g> </g></svg><br></br>
                        <p className='px-2'>Raahi’s expert mentors reshaped my leadership approach and fueled my success.<br></br><br></br> 
                        <span className='text-lg font-semibold text-blue-800'>Devanshi Negi</span> 
                        <br></br> <span className='text-slate-400'>Jaipur, Rajasthan</span>
                        </p>
                    </div>
                </Carousel>
            </div>
            <div className='h-full overflow-hidden relative left-20 w-[18rem]' style={{borderTopRightRadius: '50%'}}>
                <img src='../../../src/assets/explore5.png' alt='Picture' className='h-[100%] object-cover object-[30%]'/>
            </div>
        </div>
    </div>
  )
}

export default Testimonials

const Carousel = styled(Slider)`
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;

      ul li button{
        display: none;
      }

      .slick-list{
             width: 20vw;
             position: relative;
             top: 2vh;
      }

      .slick-track {
            display: flex;
            align-items: center;
            justify-content: center;
  }

`

const NextArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 87%;
  right: 67%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  &:before {
    display: none;
  }
`

const PrevArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 87%;
  left: 13%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  &:before {
    display: none;
  }
`