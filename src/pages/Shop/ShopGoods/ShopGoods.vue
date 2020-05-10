<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- current -->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
<!--                    <span class="old">￥20</span>-->
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CarControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="foodInfo" ref="food"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CarControl from '../../../components/CarControl/CarControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    name: '',
    data () {
      return {
        scrollY: 0, // 右侧滑动的Y轴坐标(滑动过程实时变化)
        tops: [], // 所有右侧分类li的top组成的数组(列表第一次显示后就不在变化)
        foodInfo: {}, // 需要显示的food
      }
    },
    components: {
      CarControl,
      Food,
      ShopCart
    },
    computed: {
      ...mapState(['goods']),
      // 有个计算属性(暂时使用data来代替)
      currentIndex () {
        // 得到相关的条件数据
        const {scrollY, tops} = this;
        // 根据条件计算产生一个结果
        const index = tops.findIndex((top, index) => {
          // scrollY >= 当前top 和 scrollY < 下一个top
          return scrollY >= top && scrollY < tops[index+1];
        });
        // 返回结果
        return index;
      }
    },
    mounted () {
      //console.log(this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'));
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => { // 更新显示后执行
          /* eslint-disable no-new */
          this._initScroll();
          this._initTops();
        })
      });
    },
    methods: {
      clickMenuItem (index) {
        // console.log(index);
        // 使右侧列表滑动到相应位置
        const scrollY = -this.tops[index];
        this.scrollY = -scrollY;
        this.foodsScroll.scrollTo(0, scrollY, 300);
      },
      showFood (food) {
        // 设置food
        console.log(food);
        this.foodInfo = food;
        // 显示food属性
        // 父组件中调用子组件的方法
        this.$refs.food.toggleShow();
      },
      _initScroll () {
        new BScroll('.menu-wrapper', {
          click: true
        });
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,
          click: true
        });
        this.foodsScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y);
        });
        this.foodsScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y);
        });
      },
      _initTops () {
        // 初始化tops
        const tops = [];
        let top = 0;
        tops.push(top);
        //  2.收集
        // 找到所有的分类li
        const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight;
          tops.push(top);
        })
        // 3.更新状态
        this.tops = tops
      }
    },
    watch: {
      // 监视goods
      // goods (value) {
      //   this.$nextTick(() => { // 当数据得到之后创建一个BScroll
      //     /* eslint-disable no-new */
      //     new BScroll('.menu-wrapper')
      //   })
      // }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            >span
              display inline-block
            .count
              margin-right: 12px
          .price
            height 25px
            font-weight: 700
            line-height: 24px
            >span
              display inline-block
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

