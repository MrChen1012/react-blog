import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import '../static/style/pages/article-list.css'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import servicePath from '../config/api'

//进度 p06
const articleList = (list) => {
  const [articleList, setArticleList] = useState(list.data);
  useEffect(() => {
    setArticleList(list.data);
  })
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center' wrap={false}>
        <Col className='comm-left' xs={24} sm={24} md={18}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={articleList}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      {item.title}
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span><CalendarOutlined /> {item.add_time}</span>
                    <span><FolderOutlined /> {item.type_name}</span>
                    <span><FireOutlined /> {item.view_count}人</span>
                  </div>
                  <div className='list-context'>{item.introduce}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className='comm-box' xs={0} sm={0} md={6}>
          <Author />
          <Advert />
        </Col>
      </Row>
    </>
  )
}
articleList.getInitialProps = async (ctx) => {
  console.log(ctx.query);
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleListById}?id=${ctx.query.id}`).then((res) => {
      resolve(res.data)
    })
  })
  return await promise;
}

export default articleList;