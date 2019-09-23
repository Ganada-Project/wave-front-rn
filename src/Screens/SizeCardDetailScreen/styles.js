import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from '../../constants';
const window = Dimensions.get('window');
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${theme.backgroundColor};
  padding: 100px 25px 10px 25px;
  flex-direction: column;
`;

export const Header = styled.View`
  flex: 0.3;
  flex-direction: column;
`;

Header.Profile = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

Header.Image = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

Header.Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.textColor};
`;

Header.Tab = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
`;

Header.TabItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

Header.TabItem = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 15px 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgba(136, 146, 156, 0.2);
`;

Header.TabItemText = styled.Text``;

export const Body = styled.ScrollView`
  flex: 1;
  /* padding: 15px 0; */
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
  color: ${(props) => (props.isSelected ? theme.textColor : theme.textColor)};
`;

export const BodyContent = styled.View`
  flex: 1;
  padding-top: 15px;
  flex-direction: column;
`;

export const SubTapWrapper = styled.View`
  flex: 1;
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
  height: 80px;
  padding: 0px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayColor};
`;

SubTapItem.SizeText = styled.Text`
  color: ${theme.pointColor};
  margin-top: 5px;
`;

export const SubTapTextWrapper = styled.View`
  flex: 2;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const SubTapIndicatorWrapper = styled.View`
  flex: 1;
`;

export const SubTapText = styled.Text`
  font-weight: bold;
  color: ${theme.textColor};
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
