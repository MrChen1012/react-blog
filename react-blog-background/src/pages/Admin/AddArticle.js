import React, { useEffect, useState } from 'react';
import marked from 'marked';
import '../../static/style/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleId, setArticleId] = useState(0);
  //文章标题
  const [articleTitle, setArticleTitle] = useState('');
  //markdown的编辑内容
  const [articleContent, setArticleContent] = useState('');
  //html内容
  const [markdownContent, setMarkdownContent] = useState('预览内容');
  //简介的markdown内容
  const [introducemd, setIntroducemd] = useState('');
  //简介的html内容       
  const [introducehtml, setIntroducehtml] = useState('等待编辑');
  //发布日期
  const [showDate, setShowDate] = useState();
  //修改日志的日期
  const [updateDate, setUpdateDate] = useState();
  // 文章类别信息
  const [typeInfo, setTypeInfo] = useState([]);
  //选择的文章类别
  const [selectedType, setSelectType] = useState(1);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  useEffect(() => {
    getTypeInfo();
    //获取文章id
    let tmpId = props.match.params.id;
    console.log(tmpId);
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, [])

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(res => {
      if (res.data.data === '没有登录') {
        localStorage.removeItem('openId');
        props.history.push('/');
      } else {
        setTypeInfo(res.data.data);
      }
    })
  }
  const getArticleById = (id) => {
    axios({
      method: 'get',
      url: servicePath.getArticleById,
      params: { id },
      withCredentials: true
    }).then(
      res => {
        //let articleInfo= res.data.data[0]
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].add_time)
        setSelectType(res.data.data[0].type_id)
      }
    )
  }
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  }
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  }
  const selectTypeHandler = (value) => {
    setSelectType(value);
  }
  //校验
  const verArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    return true;
  }
  const saveArticle = () => {
    if (!verArticle()) return;
    let dataProps = {};   //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace('-', '/'); //把字符串转换成时间戳
    dataProps.add_time = (new Date(datetext).getTime()) / 1000;

    if (articleId === 0) {
      dataProps.view_count = 0;
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then((res) => {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章保存成功');
        } else {
          message.error('文章保存失败');
        }
      })
    } else {
      dataProps.id = articleId;
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success('文章保存成功');
        } else {
          message.error('保存失败');
        }
      })
    }

  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                value={articleTitle}
                onChange={e => {
                  setArticleTitle(e.target.value)
                }}
                placeholder="博客标题"
                size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue="Sign Up" size="large">
                <Option value="Sign Up">视频教程</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span='24'>
              <Button size='large'>暂存文章</Button>&nbsp;
              <Button type='primary' size='large' onClick={saveArticle}>发表文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介' + introducemd }}></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="date-select"></div>
              <Select defaultValue={selectedType} size='large' onChange={selectTypeHandler}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.type_name}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle;