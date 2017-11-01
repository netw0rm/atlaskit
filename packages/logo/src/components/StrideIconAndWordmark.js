import React from 'react';
import uid from 'uid';

import LogoBase from './LogoBase';
import Wrapper from '../styled/Wrapper';

const svg = ({ iconGradientStart, iconGradientStop }) => {
  const id = uid();
  return `<canvas height="32" width="97"></canvas>
  <svg viewBox="0 0 97 32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="76.0077856%" y1="30.8164837%" x2="3.20549956%" y2="70.7051948%" id="${id}">
        <stop stop-color="${iconGradientStart}" ${(iconGradientStart === 'inherit') ? 'stop-opacity="0.4"' : ''} offset="18%"></stop>
        <stop stop-color="${iconGradientStop}" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g stroke="none" stroke-width="1" fill-rule="nonzero">
      <path d="M44.1672398,19.2931423 C44.1672398,16.225334 42.1393665,15.0554071 38.5255923,14.145464 C35.5097807,13.3915111 34.4178489,12.6895549 34.4178489,11.2856426 C34.4178489,9.7257401 35.7437661,8.94578883 37.9796264,8.94578883 C39.7475159,8.94578883 41.5934006,9.25776934 43.3092934,10.2457076 L43.3092934,7.90585381 C42.1393665,7.25589442 40.5534656,6.65793178 38.0836199,6.65793178 C34.1058684,6.65793178 32.0779951,8.63380832 32.0779951,11.2856426 C32.0779951,14.0934672 33.7938879,15.4193844 37.6416475,16.3553259 C40.8914445,17.1352772 41.827386,17.9412268 41.827386,19.4491326 C41.827386,20.9570384 40.8654461,21.970975 38.2916069,21.970975 C36.0297482,21.970975 33.5859009,21.3730124 32,20.5410644 L32,22.9329149 C33.3259172,23.6088727 34.8598213,24.2588321 38.161615,24.2588321 C42.3993503,24.2588321 44.1672398,22.2569572 44.1672398,19.2931423 Z M50.0168743,19.891105 L50.0168743,13.0795306 L53.4746583,13.0795306 L53.4746583,10.9996605 L50.0168743,10.9996605 L50.0168743,8.24383269 L47.8330108,8.24383269 L47.8330108,10.9996605 L45.7271423,10.9996605 L45.7271423,13.0795306 L47.8330108,13.0795306 L47.8330108,19.9431017 C47.8330108,22.3609507 49.1849263,23.9988483 51.9667525,23.9988483 C52.6427103,23.9988483 53.0846826,23.8948548 53.4746583,23.7908613 L53.4746583,21.6329961 C53.0846826,21.7109913 52.5907135,21.8149848 52.070746,21.8149848 C50.6928321,21.8149848 50.0168743,21.0350335 50.0168743,19.891105 Z M56.3344796,23.9988483 L58.5183431,23.9988483 L58.5183431,16.3293275 C58.5183431,13.5734997 60.2602343,12.7155533 63.1200556,13.0015354 L63.1200556,10.8176719 C60.5722148,10.6616816 59.272296,11.7536134 58.5183431,13.2875176 L58.5183431,10.9996605 L56.3344796,10.9996605 L56.3344796,23.9988483 Z M64.6279614,7.56787492 C64.6279614,8.5558132 65.2779208,9.12777746 66.187864,9.12777746 C67.0978071,9.12777746 67.7477665,8.5558132 67.7477665,7.56787492 C67.7477665,6.57993665 67.0978071,6.00797239 66.187864,6.00797239 C65.2779208,6.00797239 64.6279614,6.57993665 64.6279614,7.56787492 Z M65.0439354,23.9988483 L67.2797957,23.9988483 L67.2797957,10.9996605 L65.0439354,10.9996605 L65.0439354,23.9988483 Z M79.4730339,23.9988483 L79.4730339,21.6589945 C78.6410859,23.3748873 77.0811833,24.2588321 75.0793084,24.2588321 C71.6215245,24.2588321 69.8796333,21.3210156 69.8796333,17.4992544 C69.8796333,13.8334835 71.6995196,10.7396768 75.3392922,10.7396768 C77.2371736,10.7396768 78.6930826,11.5976231 79.4730339,13.2875176 L79.4730339,5.566 L81.7088942,5.566 L81.7088942,23.9988483 L79.4730339,23.9988483 Z M72.1154936,17.4992544 C72.1154936,20.6190595 73.3634156,22.178962 75.6772711,22.178962 C77.679146,22.178962 79.4730339,20.9050416 79.4730339,18.0192219 L79.4730339,16.9792869 C79.4730339,14.0934672 77.8351362,12.8195468 75.9372548,12.8195468 C73.4154124,12.8195468 72.1154936,14.4834428 72.1154936,17.4992544 Z M95.332043,23.4788808 C94.2661096,24.0508451 92.628212,24.2588321 91.3022948,24.2588321 C86.4405986,24.2588321 84.3087318,21.4510075 84.3087318,17.473256 C84.3087318,13.5475013 86.4925953,10.7396768 90.4443484,10.7396768 C94.4480983,10.7396768 96.0599976,13.5215029 96.0599976,17.473256 L96.0599976,18.4871927 L86.5705905,18.4871927 C86.882571,20.6970546 88.3124816,22.1269653 91.3802899,22.1269653 C92.8881957,22.1269653 94.1621161,21.8409831 95.332043,21.4250091 L95.332043,23.4788808 Z M90.3403549,12.7675501 C87.9745027,12.7675501 86.7785775,14.3014542 86.5445921,16.5633129 L93.7981389,16.5633129 C93.668147,14.145464 92.5762152,12.7675501 90.3403549,12.7675501 Z" fill="inherit" fill-rule="evenodd"></path>
      <path d="M6.66434783,6 L6.66434783,10.0267857 C6.66434783,15.6020536 4.00695652,17.7545536 0.626086957,18.0803571 C0.269286057,18.1180932 -0.00179704222,18.4350964 -1.9308116e-16,18.8125 C-1.9308116e-16,20.3133929 -1.9308116e-16,23.860625 -1.9308116e-16,25.4017857 C-0.000289607564,25.6031446 0.0782306046,25.7957406 0.217087594,25.9342627 C0.355944583,26.0727847 0.542879466,26.1450036 0.733913043,26.1339286 C9.2,25.68 14.2991304,19.1785714 14.2991304,11.1066964 L14.3234783,11.1066964 L14.3234783,6 L6.66434783,6 Z" fill="url(#${id})"></path>
      <path d="M23.6521739,25.0759821 L14.6886957,6 L6.66434783,6 L16.1321739,25.5372321 C16.3109114,25.9036978 16.6694737,26.1340777 17.0608696,26.1339286 L23.0365217,26.1339286 C23.2760081,26.1312811 23.49736,25.9991651 23.6224471,25.7842135 C23.7475342,25.5692619 23.7587644,25.301705 23.6521739,25.0759821 Z" fill="currentColor"></path>
    </g>
  </svg>`;
};

export default class StrideIconAndWordmark extends LogoBase {
  render() {
    const { label, size, ...props } = this.props;
    return (
      <Wrapper
        aria-label={label}
        size={size}
        dangerouslySetInnerHTML={{ __html: svg(props) }}
        {...props}
      />
    );
  }
}
