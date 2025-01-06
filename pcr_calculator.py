import streamlit as st

st.markdown('### 🧬 通用PCR计算器')
st.markdown('<font color="grey" size=3> 聚合酶链式反应，又称为PCR，是众所周知的分子生物学技术之一。本计算器用于计算PCR反应体系的原料用量。</font>', unsafe_allow_html=True)
st.divider()

st.markdown('##### ⚙️ 请设定如下实验参数')

col1, col2 = st.columns(2, gap='large')

with col1:
    st.markdown('请设定反应体系的大小')
    option1 = st.selectbox(
        '#### 步骤 1: 请设定反应体系的大小',
        (25, 30, 50, 100), index=None, format_func=lambda x: f'{x} μL',placeholder='反应总体积', label_visibility='collapsed')

    st.markdown('请选择缓冲液的稀释比')
    option2 = st.selectbox(
        '#### 步骤 2: 请选择缓冲液的稀释比',
        (2, 10), index=None, format_func=lambda x: f'{x} ×',placeholder='缓冲液稀释比', label_visibility='collapsed')

    st.markdown('请设定Primer的体积(单一)')
    option3 = st.selectbox(
        '#### 步骤 3: 请设定单一Primer的体积',
        (2, 3, 4, 5, 6), index=None, format_func=lambda x: f'{x} μL',placeholder='单一Primer体积', label_visibility='collapsed')

with col2:
    st.markdown('请选择DNA模版的体积')
    option4 = st.selectbox(
        '#### 步骤 4: 请选择DNA模版的体积',
        (1, 2, 3, 5), index=None, format_func=lambda x: f'{x} μL',placeholder='DNA模版的体积', label_visibility='collapsed')

    st.markdown('请选择移液枪损耗比例')
    option5 = st.selectbox(
        '#### 步骤 5: 移液枪损耗比例',
        (3, 5, 10), index=None, format_func=lambda x: f'{x} %',placeholder='移液枪损耗比例', label_visibility='collapsed')

    st.markdown('请设定样品的数量')
    option6 = st.slider('#### 步骤 6: 请选择样品的数量', min_value=1, max_value=20, value=1, step=1, label_visibility="collapsed")

st.divider()

st.markdown('##### 🗒️ 请按照如下的步骤，完成实验')

if option1 is not None and option2 is not None and option3 is not None and option4 is not None and option5 is not None:
    
    system_volume = option1 # 反应体系的大小
    buffer_dilution = option2 # 缓冲液的稀释比
    primer_volume = option3 # Primer的体积
    dna_template_volume = option4 # DNA模版的体积
    pipette_loss = option5 # 移液枪损耗比例
    sample_number = option6 # 样品的数量

    buffer_volume = system_volume / buffer_dilution # 缓冲液的体积
    water_volume = system_volume - (primer_volume * 2) - dna_template_volume - buffer_volume # 水的体积
    system_volume_withot_template = system_volume - dna_template_volume

    overall_volume = system_volume * sample_number * (100 + pipette_loss) / 100 # 总体积（含损耗）
    overall_water_volume = water_volume * sample_number * (100 + pipette_loss) / 100
    overall_buffer_volume = buffer_volume * sample_number * (100 + pipette_loss) / 100
    overall_primer_volume = primer_volume * sample_number * (100 + pipette_loss) / 100

    st.markdown('<font color="grey" size=3> 1. 请按照如下步骤，配置所有样品的母液（Master Mix）。</font>', unsafe_allow_html=True)

    if overall_volume > 1500:
        st.markdown("- 步骤 1.1: 选择 **2 mL** 的试管")
    else:
        st.markdown("- 步骤 1.1: 选择 **1.5 mL** 的试管")

    st.markdown(f"- 步骤 1.2: 向试管中加入 **{overall_water_volume:.1f} μL** 的水")
    
    st.markdown(f"- 步骤 1.3: 向试管中加入 **{overall_buffer_volume:.1f} μL** 的缓冲液")

    st.markdown(f"- 步骤 1.4: 向试管中加入 **{overall_primer_volume:.1f} μL** 的Forward Primer")

    st.markdown(f"- 步骤 1.5: 向试管中加入 **{overall_primer_volume:.1f} μL** 的Reverse Primer")

    st.markdown('<font color="grey" size=3> 2. 请按照如下步骤， 将母液分装到所有样品的PCR管中。</font>', unsafe_allow_html=True)

    st.markdown(f"- 步骤 2.1: 向每个PCR管中加入 **{system_volume_withot_template} μL** 的母液")

    st.markdown('<font color="grey" size=3> 3. 请按照如下步骤， 将每个样品的 DNA加入到每个PCR管中。</font>', unsafe_allow_html=True)

    st.markdown(f"- 步骤 3.1: 向每个PCR管中加入 **{dna_template_volume} μL** 的DNA模版")


    

    

# 显示选择的结果



