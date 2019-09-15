import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');
export const Wrapper = styled.View`
  flex: 1;
  /* height: 500px; */
  background-color: rgba(255, 255, 255, 0.85);
  padding: 100px 25px 10px 25px;
`;

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: black;
`;

export const Body = styled.View`
  flex: 3;
  /* padding: 15px 0; */
  /* border: 1px red solid; */
`;

export const TapWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
`;

export const TapItem = styled.View`
  width: 60px;
  margin-right: 20px;
  color: ${theme.textColor};
`;

export const TapIndicator = styled.View`
  margin-top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${theme.textColor};
`;
export const TapIndicatorBlank = styled.View`
  margin-top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: transparent;
`;

export const TapText = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: ${(props) => (props.isSelected ? theme.textColor : theme.grayColor)};
`;

export const BodyContent = styled.View`
  flex: 1;
  padding-top: 15px;
  flex-direction: row;
`;

export const SubTapWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const DetailWrapper = styled.View`
  flex: 2;
`;

export const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MeasurementWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MeasurementText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const SubTapItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SubTapTextWrapper = styled.View`
  flex: 2;
`;

export const SubTapIndicatorWrapper = styled.View`
  flex: 1;
`;

export const SubTapText = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.isSelected ? theme.pointColor : theme.grayColor)};
`;

export const SubTapIndicator = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${theme.subColor};
`;

export const SubTapIndicatorBlank = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: transparent;
`;
