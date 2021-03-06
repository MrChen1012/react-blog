import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Input, Spin, message } from 'antd';
import '../../static/style/Login.css';
import servicePath from '../../config/apiUrl';
import {
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    if (!userName) {
      message.error('用户名不能为空')
      return false
    } else if (!password) {
      message.error('密码不能为空')
      return false
    }
    setIsLoading(true);
    let dataProps = {
      userName: userName,
      password: password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data === '登录成功') {
        localStorage.setItem('openId', res.data.openId)
        props.history.push('/index')
      } else {
        message.error('用户名密码错误')
      }
    })
  }

  return (
    <>
      <div className="login-div">
        <Spin tip='Loading...' spinning={isLoading}>
          <Card title='Chenlmw Blog  System' bordered={true} style={{ width: 400 }}>
            <Input id='userName'
              onChange={(e) => { setUserName(e.target.value) }}
              size='large'
              placeholder='Enter your userName'
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
            <br /><br />
            <Input.Password
              id="password"
              onChange={(e) => { setPassword(e.target.value) }}
              size="large"
              placeholder="Enter your password"
              prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <br /><br />
            <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
          </Card>
        </Spin>
      </div>
    </>
  )
}

export default Login;