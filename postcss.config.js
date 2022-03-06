// px 转换成 rem
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      //   rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
