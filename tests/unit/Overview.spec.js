import { expect } from "chai";
import { shallow } from "@vue/test-utils";
import { shallowMount } from "@vue/test-utils";
import Overview from "@/components/OverviewComponent.vue";

describe("Overview.vue", () => {
  it("Checking h2 tag text", () => {
     const wrapper = shallow(Overview);
     const h1 = wrapper.find("h1")
    expect(h1.text()).to.include("Discover all Adventures");
  });

 it("renders props.msg when passed", () => {
  const msg = "Discover all Adventures";
  const wrapper = shallowMount(Overview, {
    propsData: { msg }
  });
  expect(wrapper.text()).to.include(msg);
});


});
