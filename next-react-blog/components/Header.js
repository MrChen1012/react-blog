import React, { useEffect } from 'react';
import Router from 'next/router';
import '../static/style/components/header.css'
import { Row, Col, Menu, } from 'antd'
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'

const Header = () => {
  useEffect(() => {
    console.log(document.documentElement.clientWidth);
  })
  const handleClickNav = (e) => {
    console.log(e.key == 0);
    if (e.key == 0) {
      Router.push('/');
    } else {
      console.log('触发');
      Router.push({ pathname: '/list', query: { id: e.key } })
    }
  }
  return (
    <div className='header'>
      <div className="header-content">
        <Row type='flex' justify='space-between'>
          <Col className='header-hint' xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className='header-logo'>Chenlmw</span>
            <span className='header-txt'>不甘现状，勇往直前</span>
          </Col>
          <Col className='memu' xs={0} sm={0} md={14} lg={8} xl={12}>
            <Menu mode='horizontal' onClick={handleClickNav}>
              <Menu.Item key={0}>
                <HomeOutlined />
            首页
          </Menu.Item>
              <Menu.Item key={1}>
                <YoutubeOutlined />
            视频
          </Menu.Item>
              <Menu.Item key={2}>
                <SmileOutlined />
            生活
          </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header;