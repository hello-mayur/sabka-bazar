import React, { useEffect, useRef} from 'react'
import {HomeContainerWrapper, CategoriesWrapper} from './Home.style';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import {fetchBanner} from './HomeAction';
import { Carousel, Button } from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {config} from "../../config"
import BannerList from '../../server/banners/index.get';
import CategoriesList from '../../server/categories/index.get';
const contentStyle = {
  height: '180px',
  // lineHeight: '160px',
  textAlign: 'center',
};

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slider = useRef(null);
  const {banner_data, categories_data, loading} = useSelector(state => state.HOMEREDUCER);

  console.log(banner_data, categories_data, loading)

  useEffect(() => {
    dispatch(fetchBanner());
  },[dispatch]);

  const imageUrlFormatter = (url) => {
    return `${config.base_url}${url}`;
  }

  const handleExplore = () => {
    navigate('/products');
  }


  return (
    <React.Fragment>
      <HomeContainerWrapper>
          <LeftOutlined 
            className="carousal_arrow"
            onClick={() => slider.current.prev()}
          />
            <div className="carousal_container">
              <Carousel ref={slider} infinite={false} autoplay dots={false}>
                {BannerList && BannerList.length > 0 && BannerList.map((item, index) => {
                  return (
                    <div key={item.id} >
                      <img 
                        src={item.bannerImageUrl} 
                        alt={item.bannerImageAlt} 
                        
                      />
                    </div>
                  )
                })}
              </Carousel>
            </div>
          <RightOutlined 
            className="carousal_arrow"
            onClick={() => slider.current.next()}
          />
      </HomeContainerWrapper>
      <CategoriesWrapper>
        {CategoriesList && CategoriesList.length > 0 && CategoriesList.map((item, index) => {
          if(item.imageUrl && item.name && item.description){
            return (
              <div key={item.id} className="categories_container">
                <img src={item.imageUrl} alt={item.key} />
                <div className="categories_right_item">
                  <h2>{item.name ? item.name : ""}</h2>
                  <p>{item.description ? item.description : ""}</p>
                  <Button size="large" style={{ background: "#be2857", color:"white"}} onClick={handleExplore}>Explore More</Button>
                </div>
              </div>
            )
          }
        })}
      </CategoriesWrapper>
    </React.Fragment>
  )
}

export default React.memo(Home)