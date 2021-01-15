import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
//解析markdown
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/detailed.css';
import { Row, Col, Breadcrumb, Affix } from 'antd';
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import Tocify from '../components/tocify.tsx';
import servicePath from '../config/api';

const Detailed = (articleData) => {
  const article = articleData.data[0];
  //初始化marked
  const renderer = new marked.Renderer();
  //初始化markdown目录插件
  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
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

  let markdown = marked(article.article_content);
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                React实战视频教程-技术胖Blog开发(更新08集)
                </div>

              <div className='list-icon center'>
                <span><CalendarOutlined /> {article.add_time}</span>
                <span><FolderOutlined /> {article.type_name}</span>
                <span><FireOutlined /> {article.view_count}人</span>
              </div>

              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: markdown }}>
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleById}?id=${id}`).then((res) => {
      resolve(res.data);
    })
  })
  return await promise;
}

export default Detailed;