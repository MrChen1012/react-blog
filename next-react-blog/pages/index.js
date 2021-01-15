import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
//解析markdown
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/index.css'
import { Row, Col, List } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import servicePath from '../config/api'

//进度 p24
const Home = (list) => {
  const [articleList, setArticleList] = useState(list.data);

  //初始化marked
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: true,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center' wrap={false}>
        <Col className='comm-left' xs={24} sm={24} md={18}>
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
                <div className='list-context' dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className='comm-box' xs={0} sm={0} md={6}>
          <Author />
          <Advert />
        </Col>
      </Row>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      resolve(res.data)
    })
  })
  return await promise;
}


export default Home;