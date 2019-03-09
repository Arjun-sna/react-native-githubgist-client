import styled from 'styled-components';
import { colors } from '../../../config';

const CardContainer = styled.TouchableOpacity`
  shadow-color: rgba(0, 0, 0, 0.4),
  shadow-offset: 0px 3px;
  shadow-radius: 3px;
  shadow-opacity: 0.5;
  elevation: 1;
  padding: 2%;
  margin: 3px;
  border-radius: 2px;
  flex-direction: column;
  background-color: ${colors.white}
`;

export default CardContainer;