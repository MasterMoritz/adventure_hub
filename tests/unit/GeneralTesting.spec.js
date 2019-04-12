import { expect } from "chai";
import { shallow } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import { mount } from '@vue/test-utils'
import Overview from "@/components/OverviewComponent.vue";
import CreatePanel from "@/components/CreatePanel.vue";

describe("Overview.vue", () => {
  it("Checking h2 tag text", () => {
    const wrapper = shallow(Overview);
    const h1 = wrapper.find("h1")
    expect(h1.text()).to.include("Discover all Adventures");
  });

  it("renders props.msg when passed", () => {
    const msg = "Adventures";
    const wrapper = shallowMount(Overview, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });

  it("test if v-cards loaded", () =>{
    const wrapper = mount(Overview)
    expect(wrapper.html()).to.contain('<v-card>')

  })

  it("test if adventure is created", () =>{
    const wrapper = mount(CreatePanel,{
      data: {
        page: {
          title: 'test'
        }
      }
    })

    expect(wrapper.find('.page.title').text().to.contain('test')
    })

  })


});
