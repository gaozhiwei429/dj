<template>
<view>
    <cmd-nav-bar back title="考试信息"></cmd-nav-bar>
	<cmd-page-body type="top">
      <cmd-transition name="fade-up">
		<view class="exam">
			<exam-widght :dataList='QuestionList' :index="index" @select='selectItem' @selectFinish='selectFinish' @finish='finish'>
			</exam-widght>
		</view>
      </cmd-transition>
    </cmd-page-body>
</view>
</template>
<!--
<template>
	<view>
		<exam-widght :dataList='QuestionList' :index="index" @select='selectItem' @selectFinish='selectFinish' @finish='finish'>
		</exam-widght>
	</view>
</template>-->
<script>
    import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
  import cmdInput from "@/components/cmd-input/cmd-input.vue"
	import examWidght from '@/components/exam/exam.vue';
	var _this;
	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdInput,
			examWidght
		}, 
		data() {
			return {
				fldTestPaperID: undefined,
				fldTestRecordID: undefined,
				items: [],
				index: 0,
				QuestionList: [],
			}
		},
		onLoad(opt) {
			console.log(111)
			_this = this;
			_this.getTestPaper();
		},
		onUnload() {},
		methods: {
			finish(item) {
				console.log("-----finish------")
				console.log(item)
			},
			selectItem(item) {
				console.log("-----selectItem------")
				console.log(item)
			},
			selectFinish(item) {
				console.log("-----selectFinish------")
				console.log(item)
				item.index++
				let title = item.index + '/' + item.total

				if (item.question.questionType == 0)
					title += "  单选题";
				else if (item.question.questionType == 1)
					title += "  多选题";
				else
					title += "  填选题";
				uni.setNavigationBarTitle({
					title: title
				});
			},
			getTestPaper() {
				let data = require('../../static/data.json')  ;
				console.log(data.QuestionList)
				_this.QuestionList = data.QuestionList;
				if (_this.QuestionList.length > 0) {
					let title = '1/' + _this.QuestionList.length
					if (_this.QuestionList[0].questionType == 0)
						title += "  单选题";
					else if (_this.QuestionList[0].questionType == 1)
						title += "  多选题";
					else
						title += "  填空题";
					uni.setNavigationBarTitle({
						title: title
					});
				}
			}
		}
	}
</script>


<style>
  .exam {
    margin-top: 50upx;
  }
</style>

