import React from 'react';
import {PieChart} from 'react-native-svg-charts';

class Pie extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data1: this.props.data,
    };
  }
  render() {
    const data1 = this.props.data;
    console.log('Data in component:', data1);

    const randomColor = () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
        0,
        7,
      );

    const pieData = data1.filter(value => value > 0);
    console.log('Pie data:', pieData);
    pieData.map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

    /*{
      this.setState({
        data: this.props.salesdata,
      });
    }*/
    return <PieChart style={{height: 200}} data={pieData} />;
    console.log('Pie Chart detail', data1);
  }
}
export default Pie;
