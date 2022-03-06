import request from "./request";

export const login = (data) => {
  //函数体
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

/**
 * 发送验证码
 * 注意：每手机号每分钟1次
 */
 export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
