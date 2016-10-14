import { action } from '@kadira/storybook';
import { getTimestampWithOffset } from '../src/util/datetime';

// eslint-disable-next-line max-len
const avatarImage = 'data:image/jpeg;charset=utf-8;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAwBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/CABEIAIAAgAMBEQACEQEDEQH/xAAdAAACAwADAQEAAAAAAAAAAAAGBwUICQIDBAEK/9oACAEBAAAAABqnz2XnuX8iUo5icTQlWh4ViKmdCsP4GCryHmUlZ9jqcnKyZLj0IRgyC8wsL+t7skmLouwicMRMOp11RphZOmMAaWpIO72kViUjUtLfL27HiGbeT3KzzFN5/wC2KH85wWzP6DuutSExjV1liV3d48cgtUYW2W70DQ6xuVQWPcjNiQE3F16Zp/tSNMRc5nt2k4a1ziHmCullm7XaI1ssIl6PVWgIt3dgeRelNeH9CzAWaOMMOJbyfWrPg57F94bpXo0gV9WrNXz+cqmPjBjRV9ljN1QWtI+vM+P4WEPlN0/I+3ujhscL1BqoSousbFcK92crxw2GtV4yEW51+ngrEbk2PHberi32tdBnOrotWbLTeIrOp7d1mKWo+2trhNpxo0AMSvOUJxVT/8QAGwEAAQUBAQAAAAAAAAAAAAAAAgABAwQFBgf/2gAIAQIQAAAApxumSNRBITE4s7Sg8pKCrKpHQsjN5hIs6nJOcsRhJKbwZ+wQ8/JPOpGecsLAo9B1bY1axeckZZ/PI63azY9KbSRo5MXBsnT3ZGqz6Do3p0cVrVPXUquW3RPkYrRyQa8qnuypJq3GbRUqHVQvavGDiEPOlPmh0YTWrCTOdahgTVZ9k7VuQFPcXHYEzTNtbkMoj6E7c3w2QRTDZ7zco8/b9HwS53iqb1iO32/Sy5k3R5FPJ4rFTIdHv+pmzv/EAB0BAAEFAQEBAQAAAAAAAAAAAAUDBAYHCAIBCQD/2gAIAQMQAAAA+jVzQSSNzrCqKq0S+bJSkCDNyKKSoAMpfNcaMXFeS1iIB2MyIEIlkOih3qa2ibrnRYtAZcMWz7klr46fiPD22pHJ5CKryS4ChiUrOOo9EXGrLHKWF7W9f5GYmZInypC+dTW8JuRyFxjRqUgNoMigE9oGz3Nmvh+HaJfESyrAgMtm7TpCXuGmXc1PpDw7arDtKSqUF5GUHVljeLypl26Tse7X0pkqJ0F7WkHpGOv2q+i5iemJZWKki9bwKuKZ6dNtIzCwWYqYN4/XtL1c55X/AHPlkajdfrI+WVVclpsbR6RUHQdhcW4kflSR8Lzghy7S8FQcRxZlpZWdOns2kSHfSoavw3Dr/8QAKhAAAgICAQMEAQMFAAAAAAAAAwQCBQEGAAcRFBITFSEIFyI1IyQlMTL/2gAIAQEAAQUCJ9C/3lShFjmVcJWrWMyX/wCeK4zlh5mKwJusDkJUpwfMMwlXIEu8OaviI03JIlRLX5cWmr8tPayyh2+665NGskeU2I/vgdOEMMOwphWW2mfHi0z4a26HUEHZ/lWap6OaoLmIGRFCysUbr3m13/ctkasSS+wpQUdXaiBPizUVw2u0gyt8meywBeMeGL7fCnnLKzcsGrtix6hvZaWrGfDBB5EXA2JBOWFwGvwn/nbb4fgMAZjsXpVJatxdaXPEM2TYzGi1mw2M7XRh0CVinJBqB+0qtwtYZS4ySdmX+3pgwZnYqeC1q38rn7xSglEewkYtLIqs8D8XEI9M+k5bZmt1NetRcBAGesesAbGWPomMuY4oy+UOyhgQE4BFBoOXE9X/AJXlk5BVWTWD4YBCB+lmqLbHsVbRjQ5f2WK4btbcuYv62dqntNfKtte37qLM0a6bEzyUyKU7IXgcSamixnaGM42S2IwkWJeBFKU+mG8xqD6jsQbxAr+GJWu/P12yyJG4qeuwY4uNh6Y/A8GL2h9uKuzGqwE555jmM6+tJZSv6UwAFZyQ2q1oLC81jXFrPeaarynUU+IEKx09qmyXo4jj1AopbZsvWGQ8bO4phmQsd5rh4I2J8sPuGvPiQLcyxdJOVWR86NmFTXHTGm7ovNsL00AkkWs2X2R7A368q7tT6ve7Bdk2W5cWylxXHcoIcGr7QBwkYhKuUYzUMpC4KWDSTQa66jS4xOpFYXFTc64yCdCBg7mwQGqzsERWOyEIuY7bfkyWx6JQf7Rw1DPATlA3lxqp5mBVVykyCvFrvySXRDqB5KJg4jG4Q8iJJ4rxbHYzsj2wYr2cAYykMffgRcxDMcY5WJRUnEa78yQzCVpHvruiam5tSFR0EdWsATnXJ3V8usGzcPsBh18K5PaUCJ24ASlWgHzXKiEgxtwFmAVfgkz4LaCEuMxkZ+90813HUBvd65WhrdWhGFS1DHYiIZYuEsYM6t6hJaoruFFt1Sz0/tTMgZZoCRZqPAaIryvrRgpzk9pWDPrJ+ONd3124UWutkEoSvnFjPqMT0sso4PGdbOctMopDsvyC1gTvTpWs86CDDtfwW3HPCqR8ky/uSZ3rPjyqSYCx+Nmcj0bbMyS2hRnFgvGOMRbU9bQ2fQvE2MypWIyL12LL9LtXiM2yO1Qq8n7kWKMcSKkazOW6184iD2Lj8crbD2odQRf19elnA8fWc4+y49GDT7Y1r7z+Qr/sdPtJXzPm0EGprLQcrA//xAA5EAACAQMCBAIJAwIFBQAAAAABAgMAERIEIRMiMUFRYQUQFCMyM0JScWKBkbHhFTSCodFTY3KTwf/aAAgBAQAGPwJv/E+rCSFmBTLiZd/Cni649DTepbUS3fYUpwicH6R1oSpGzKRfavnS/wA1nNK2C7C+5NXgckj6W71cDqMTUfDjnD5bXNTgJIJbNkSdqI4ce+3qmvixgAxNcRmu17k+NA9jTPcgDc0XMbhT9RojAInbzplAPFLXufCo8V5o/HoRRMkXCbviaCcrbWxJtTMcVuBzX61MbkKAZBUa+zadbt1C71PFwoxgG5rbmgmCM31Ei96GAxDi9vCtRHYky2t5epjIwVE3uaeNS6sy91rh5ERjqT0FN3A70MQn56mtzlQ8f6UVJ4T979Gp8WHL9vcU017Zci+fjWcUcwkXdSTtemmuMn+LbtVmOT/aOtEzfbfEH/av8gn/AL6kKaIERC7e9qIwxrg4BsT8JtXu3yv1PSkQ48I3v3/ehgpT80Bp4GcXsWJso/ehIsiSydSgpg1w4NjftXNuKSeA5KTYr41GvDiKt5dKUlERsrcvhTvLfhQi5t3opln3vX+g0a1eSlc4rjzrgZcw5cb8lgKGdtttu9G3Pbr+motZrUIiG6IV6+FYhN7dNrCid6XVooE4HPb6q/FEA2qFwDsbGlC9C9eyuzXk3NSy5CRoCAz/AHV/oPqfI2JXbzp1UFCMjXJJxRt+KX2+6QRbqgHzmpMbWFWVOI7fCOxNZHVaHToei8LK58KfSahRHqQMlwN1ceK1JFIPeKbdLV+aQKxGXNQyJNqEvKcfq8K9lBy3zLeNCSM7+dWtF/FFrLtte1SHEgP1Pc0LkJc9T0FcKZRZujYk2tUhvzRLe1GRsryNhCg3Zj2ArWxy+jjKno6/Hw1IbhgfwP2rTakIyWtIA3UXrTSBeZ47N+qvR5eRlGs0/EYP9DCgv2+oxY3v3rN+c+N63FqYR48vW5qz9rfDXDIPBtak0zp7UAC5RB8y3017NLE0On3Yol9u2P4rVzt8yUYC/UKBYUqHBv0k2rjyaKNput+9GNRiF6V6E0sfWabFj9q9zUEUTZRaaCw870xT5i9R40Pz6rg/2pakMrWyG1NHpmTIj6tjbyqSItzqRiLdRXpOWQoJP8Odky6dd6fXSIRqPSlgl+oUHY1PFHoxigxQq17/APFJx+EoRrnC4J8q4TtdfpJ6jyph9RqeX0nNIk6RWhCxlrg9abVm8K6ndEJ+Wva9cRHbwNL+fU69SwoKu7E2FXjdZiGxYL2NKzLjbvQkOJZ9sV6WrTzTWlRHVpB+m+9afVabFhIgZR0WuN7LDC8ga8TMSUINrUG12t0WigJA5R405M6SaNdgxjwL/wBq2+lT/StTqHUSBXwUHptSMdvuFWGyDoKvXwf70eYUpj+MHloxWzLbTsDv+BUwSUycUbLja35oagsCxG/lRblA6Dao/QmtYe06Ll07Mfmx+H5FOQp37hiP6VfhZW2udzXgKGlia8snxH/pr4mp40+FGtTP3Bt67kHHxrvXGlbnVDKsY/rWKmWKRumRyUmirXuK7/CtSDTqAkbc8r7In964i+k9MJo+ZMVbkPjUcepfisFAaS3xHvR51r3N4YAfjI3b8U4jW2W7MepqRmVlWf3i37jxp9muT6vaJBf7Qeg86CWfBjiGK8preaZsd7FdjXF0wlnJBLqw6jv+1qzUTsVNxER37b0zzkRZNu3a5r2aaOWL0fp8eLLfeTfYL/zXo/Q6RV0kMZZgkfLUIAtt/NHuO4reNT+RRAFh5Uwt0FS6PUg56c8WCQfFF4j8eVJBrojw5t4Z0+CQf/D5UWgdWB32rhHqt1P70mmcRCFCOcHcgeXqQe4El7yB3PvLjoR9oWkn47yurGI8vExjX61PatCkgw4E2U3FNyb/AKPIVqZSJfeaxseILNgPhqeOdQ0mnhXh38+tWR7qOxrmHWtjcGibXNPU7utk4DfzUExCF9Lqke7G2x2IvQ07xiNnjOoikfkOC9gx6io5UkAYiyxfW37edGwRSDY3XdTWTbIgy6XvSuuTB2kChPfM+wXYHe3nXDusbKDjwo8VmU9z/ekLLwIZ/cyufeNe3XE9KUm5Ptkq700i7EqrClcd/VmOlHyrJulSADrEakVOHnqJ4YxnbqW8+lTDhQMRLwBp3Ofe9w/07/1rgPDi2oyyEjWVB9DA9dqWXHhowOJXdZwDbIfuDvUkimPmU9ZMcQLfz+PKpSxcCT33ElGMknY4keeX8VxUvpuAOFv85kfcE/dt+KsozLe7MsxxCt5H8eNaxM5Hn0+sykL+Y2tWlmHR1KGmHnXl6jXkKnf/ALVaWG0Mhm1K+7dt2sD0He1O/wA6OEcNUl2Ku/2r1PNTojtp5DdXTUdwngfuveiOHLpn4IDBTs5a3xfapr//xAAlEAEAAgIDAAICAwEBAQAAAAABABEhMUFRYXGBkcGhseHw0RD/2gAIAQEAAT8hrjlfohyXriYqI7S4EsdWx2YxKl3Qx2chPdQwmOfpiEHYncex/wAIV4l6LLAcfF8Tl2wvRXUSl68H1uMzZDTh3AWnbjV+5lLUyQu6lDKjYWXvlT+o5oHY7cXH167CFVLTcrKzBUwAyw2tYPhiVubPImGMLexxFktNL4XcVeWnIGAoptoF6WBZ2JanXkoKBSs1n8Sw6MYIm9mE6VbZj0WFTlbWDeVx0gQjVG4GWn2CLC6aIxOgYpW+jz0m7ht03WqlQNq6yo9mSXrqJxRpkhIFPT2hTyia802FGiv+sTinYUcLl6W07luM+Sj/APCJDWWFDWoa3pIyqRaKPJlfxsGRzBxyDDlznlmLU5BF9iVH3WWY8Z/kaRXmyJn5O8wMqsvKj4Jr1MnBMYHIkdzIDoZZZZvz4XOSVd+Ed+8BVq7iy/4xD9L9QlCawql7JVGc6BwL9lyiOlswo3iuun89wkaZp8h/MBFpcAPwkCHLNl/jqVd8U5HD6kdSh8Rl1qfsi2QOsxcBykO7zC5dKBt6uWEvBpCZ+adeTNXv9UczLkZ+g/8AJcjuFz8sxqwlcDH6g/TMyQ4XjtnWhoOJU8HZWhUqaixX3jdfEy/ItYVY5x05I+4elye/cXC2q7fcQ71zqeI70EqqBTStTVdYZT0GOQjNMLv/AKzYjgzL4dQYW2nLx4QeIa20F/qMsFLWNstXWOa4jJQL4tfj/wBi7MQN40DFv2HaQyCZlXTVlguhn2IVUCojn+IYscwdsfcaxD2FLGOKdQbRo0WblmF6op4uXxvM5HEfDKuZiFEcCXEsxX5ZzRDqytA8R5NurpQ/PN1gckK5Jclqix/zuEwgem4ff8iOZqz313KsI8o33uCqNjWcQCLJwTRd4Ame1WNiW/wSjHTJrHAn1QNvmMa0gEc3USaTMFvPkzy+VJeGvzMF2kNW24KBk8Af6ViPgCz2zw+Og7gv1YOY5N0ZROgRB+WvZROorP8AQ/uURi1KJmdzczrp+aiIUWW8f1WfuUWU3ub7n0pnuFRUC0Mg/UNJKDtigDg1W/sgcLsWHPTWpWmGPQ/tnmCAGlwk19x/Uy/oXDvHVxQ1AmTsTurmL+PVM8Z3kj3h+2ura+W5ZEUP+sBzrTD/AFFCS8GIwfzk9iiKafqEOV1cD0qrPkbpANMt8Sm6GwGXPxX9wD2QyVW79fEEApLij0y2kjRs/fUxWlyAv8fpmY0lQh+YzsI2ur+XR8SgtbqJw8vZOf8AV3MSSRcy2qh/+GidABhggrNiWPcoVA0uvJdI2dpduy+5XAdEvVSoLtVEAsGWOC+V0Zgd5WX+G1bJUYsalGVeuZYezNXgl8H64r+3EvgM4t/Xljpgwqu4dkLhgoVs7lfnzOfC8QNx3yAngtE0oozX3MqXC9lKP8IdCIB6HcgxJmC+gVvejUQgXUDY8LWeET+RFMAW9vsxE+WbU8sYCFHyRsXfFhABt0j1YGhRB+YGi9ueE7KSe9xyHME4I4M84jpgMN5rRmaUTNTFdo56xLw1V2JsTJYWtvcvgDQ7tNCmgHObs1B0Ktrmylj+yy4VbGYcXDgbvGJSWg51a6e6jb+GiNvdSrNwizrV6ldfBLTxdzHgwzySaLRYbOQLxF6CdRDfOaO5ew+g3CAPa9jph45joJsTuKS3TtUBdY4dXqK34WsVqNEB3TWpVdK0GtHLjlcryCuMooS1VHB7HBYh3rFb8inWKvymLHSLTpmex7+hwQztWIgCrSheoYC4UWpRrOHydRtWRcABLaCEsdKsQisOTQY+6FWtIaamdEZa9UmUK/EMAU2mXNmr3R+iCiAFUVwLL8Y8lSl1BW2SuNDGykPqCta3bQpOe/uKa0MFx5NpRWZaEP0hk/uCR1FlvYzAsVv+Y1kamMPCXSERn5YY2ZQAyAylT/7B68zdx4HDZ+8kcXWYcQIviYAGrirzGjcFwXR5P//EACQQAQEAAwACAgIDAAMAAAAAAAERACExQVFhcYGRobHB0eHw/9oACAEBAAE/ECiB0STbKeVpsVm94UKjlBCwIEHz2Z2HISlCHxY/xnyVjlLsPMy0Ajc3R8z4P9wGrSEaAHX+vzgyHRNqUw74LbAHAgSo7zbG6cUF84PqAwrvg0+vGBjlIolWb+PjL6nfbaLYB85Vx5YA8AEfsy9reptJ5GUHHIAXx8X+T6wrsE0dNV1fGOslwnZLzeJivgzmtv4x28w1SAlLPDi+L8lH9ATWVDCAhod/9YxnMGju3fDfM6PPBPQByF+O4nj3Rt0VfHcY8kH005nH9m8erRZRZBgaDxwXMBBvsEH7mAEU25r6FETA8/ir3D4B4+cQGtKqwN8uP3mjw8SVdjO+sIiPjuvC2Pn6xbdiouuxh6Mnfd6Q0MHg+sa1GBSy+cikvAe6x7E4Q8nz1APNx4RQjVCBeUvfGGgx0JIgvAywMPfKmSlKNsPxjopzNtwMD4hlssfZPrXDBUQGqsc/84O+gLDHs67yx+cdceK9FatHaXmLeQKGFK+Q0vtMRhyLfaHkvj1hk1+CNGTxTmIwbSFfb4ff6zZ93Bhdk0V2/OAql1e+V8Y8e+jbr5PMTmcbGq8MeXVDCiA64Vorf1a2TJqQCoQpqqjAMnnwWFcM/P6wPohypSnweLjoOxwlPq7B77zE7qlC62Qk84ACHo7h8XaaD9NYmSYlFvbLot/jAl6EJK6NX3m+PdYqMD8y/j5y+2ZpK72rhVm7Hx6YSVOxXUK7j+0FdmfJcMjhWLBY1Jb6wWHxlW6R5+XxiodKO88V30mHqvaX7Ot2r653Dkqmo7bA733khd4UPJBp8DrG3pTW+p8AfKe8KdGEIO/3fvKYKCMBKOCAUBQHaevf5x+iiKFDuv8AWJZuFOiIcNczaG0Qzv1QWn0x+I4T1/rDvDViY+cAoK5u0v8ALxh9pGGVgjY1rd7DBMhAKPCPhEuGLeF+h4C+1IGhwoglowEk/BDFZCR2CE+D/LiA6fYSaJBpYbvLva5AhKVd3Ps3iuWAqXSH0wlIjRAyuajJHw/jOATTgLf87kMAF6/cl1sxx9Lg0gjcCCVrJiMRoACERJx8+cQKCxej3qsu4SBK602Pq33jrDNBFCaaRcMbNKpcefD5XALRom3qoDaIC3VzYcEI712eAjxhzpGQ/wAFrI7BVBXDCWgQrmZGgwzhTWdbdQa0X0U+86rpwAifcITGDOwLNONIU2T24HpGQMaF7cBAs2HiPjyZBkw7QG6kcRNOFERD04ZyjVj5wTmA8qzWnFgl0uNKLracXXi5DlHbU0UpLa884xgvrFY7KVodwjk+sJnUJRWQURlXFFDrHQmq9Kqug8wQf1o9kc+GycyKAw0y3jau6vcdHsGB6L51+DBoRyqnrQdbgjm54MTfMTWOW10o6aftuvcyWYFFOi/85YEDReaM2dCl9L8vblJ0R+or7Xxj2HQtHFCmMBEOtdqCnvp5wEnkEJdE8Ss25P8A2GC0FivhacAIA4OYvGhp5LvA1iuaGwJDKiI0VuaCcamaY3yRXfgMM0F1y6d348uPvBNWjTwV+cCzZaootCQAQTzMeMqW74ofoGrpg5gAmuvbyPrG1GCUXqXBH6X1MRjEygbQMuLMKqM+p4xidOwGHAREpqmKhHIgR2Q/RwSiZXe0F8lVjWEIWnTxTrkhMANDQrOpyEkIT4x0cBhGfHgQiOM8pWIAJKgBZ5t1gGCcyxdoLQQMKExDw2mlILs87xG0J3usHdXnLo9ScIEGd9a9YeirlPSjn16M06G72G54QhAE9Kawzgabv5b64vSHOyyL3A81EAaoE67fITmKJFGGxOoKG1uGdV7S62b18ecpc0YIlR0ResMmhEQKfMNjwg44gZfYAcKH4/DmnDI3lEu0rqLcPSDxBrW31jgtdX6bHodWF40CFYtV8r1xfzeEI+EMdD44Ia+pku+Ogb316yGFyij5jM6SkQUgfWKFfJbxPL6O+cpEkEQcgUfLeanrIaoT6pjKI/G+PjKQYxcRp+AT5cwNEWUO4QHozXpf6SKOAo+zA0FRqEegHc3AUECmgU2B9jH6cWONL7/gPBiGbrEhK8VEpxJgn15sRsHrGIi6aIxkLUD4FB07v1MgSnucsFJt4zGu1QV3WPkQPnNBY0TnQw9PIujDXoRh0K26dFTDpFGGcR9ERUXymRuf1ZQAevwGG8q0CQxWG3Wqq1uOSFNiRrO1e1zpwQKD3MI5Kf0Jxi/A0v4fB8GCEBa3NamHibEe1nYEut6XHLd3h8qH5C59Y1U0HZmwo7ToT1hlUdotDzxn2OBsEJNAIQ0BcEeUWT3/AL6wwihiIQhk3SBFMrXX6CXaAgQDwAEtDRMEZgukUiYZB9LbQa+CJsrL3C24ecjn7j6xOBobyOAnrCQw1G31kUNwtn9ZNaFWTKJypF3wMbYBz1K16x48xhHGUTDOsyTvjlNZOSM2XdHJHzW+PA1VKISUysK3IEaYBo/TkFGg6UQGJKQW2byUuaWZCCIQEUkmFL5g26djDwIm5jiF0OAYGQRCaCzChyuioF6OIeOGsWppZQOr5kxFewV8DPjPa776YiPpuiHWuFO6d9kxCqGTajvJXC3oEdnvGqndJZGyENwAVQyYGJPTe25EodY4O84+bFXWoydA61kq80gZAC+BHA+0bsTMpVNVKALQgRjusKgPVF2AB25RQFDwcg83h98a0JOpgRIonME0ElRYpCNbUhrDUAiaaP7n6w28Z93Ww8G95tBQANbOJhwx6fT+8ooioeh1iTpQE+cY3VWKghijOqzQcFkBQ0oNZOhAA8GjpQOxMZgOm5Aobel0080FxQS4W1KtRiDqz//EACsRAAICAQQBAwMDBQAAAAAAAAECAAMRBAUSIRMQIjEUMkEGIFEjJEJhcf/aAAgBAgEBCAD0wYFw37AMzxCOMTnF904TOICuZ7c9eQegOIIJxgWLVOM8QYYj6Tv2huJ4lbYrZzAxzOXcVcQr6rMTEQZEZf492IOX5v0rkllbmpwyOPyrKfgGcp8vOImIBiATjmHoYl2rrpGTXvlTOViurqGXGepdWrjBzx9pDythPiV/d6D49FOY3U3Lcio8dbFj7mdu5suvYMKnJBHVjdTWV/1SxziI2eo0B90x6dRQQZueodK8AV4HZA+2fS0r2ygU2B00lqsnKORiayzlZgk9yszHpznKAxnAAxuWlscc1BIJ510eXoVaepyUW/CjhNgtLVsrafcvKXBvKsSwiZxCD6L3AMTubjqGqpyjapU0nvNgtHMV2svS+ZwOrhk+7aXCK4lSqAWUmKMmIIIR/CnAmQZym7AmkCavUKAtCrfhOMZq84evUcOhbbyPVFFzqSpr8Z4elaxF/kDHp/w9QEH51GHqZYtTB/fRoCy5WzS8Pv1VVSD2D/VdrVUqg/OTiVCL8TIPzMYnx8kEfJOJrquLeQUXKowTdyEufPRqrwcmw5ImIiytIOvQfdiAgziT8OMrD8cpqb6kU+Q3YfEN6gdh/IeiPbgL2Fig/lAIi47PITAgUsxKjTXBuBo2LUWHvVaAUex/1Jea/HXWiM3uaxAcRKK/meMf4hPydofzg0WrtTH3Vmi2vItAyIR3xhYAcptW2/TaYZvtNYW2AGyxCNycvYM7pULbirfT8ewEP5AEUQYC4mzHjqCDt3duIdOrAgttiWAsmoqtpbg+zaQajXJW1zgIQNwA5h5WUyZuQxYJuRxqiZzB+CYwycxWAit8zbD/AHM21gLwxqGT5DVWWblXrqE1FZRf0vpBVX9UyoABXNaqsmZU2Bk7qmLA03xMMlign0yYDHY/jZ2JuOdnTN2TR9xIvNgxaeRKgj//xAAnEQABAwQBBAICAwAAAAAAAAABABEhEDFBUQIgMGHRcYGRoVCx4f/aAAgBAgEJPwD+YKFbrfaP2EXpbuZWayO3dGywsrm/L1E62N0wVg9B6bouTQq+2vTXa3QCkCgglHs3V4QTK5pft2QQrrt8n8IRS1MiOkoOVwL6QZFyi11NOKCssSPjK5WQ6AX5hywENN/0gw5klojx7VvXlan8rAf3QdGkU5KDHashAL/IHtDHE2aHJIJEfW8sVYvBQtamqCoQwVjSJADkt52EY/Z/Kd8eELlhDvLHMT/i2zAwMy+mRcmHaAR/T0sV8dWqEgku/wAbTFrERfwiv//EACsRAAICAQQCAQMDBQEAAAAAAAECAwQFAAYREgcTIRQiMQgVQRYjMjRCJP/aAAgBAwEBCACE8SLr/tjq5n7HzLEtprFFJ2plRKCzn1/cbtkCN+N5b2bAVxOr+eNxwTpZs4ne2JytVLNUVqgPbVvMVqBMVWju1jIEsXqcdqPrLfhyq1X9tlLiUYjJHtCJW7a9bo51k8HAb8aBaqrF6UlRkYq2c3M2Nx81p9zeZ2qlim4fIOUzLH6psj2h6tjd33qDxtX2558sxKte79b7LIto85kjRTZuy1akYW/gzFVkc28eyUIrAv5eezKXG2rstiu3ut0mezFMjH7dbnyVbHVnyVzyV5Xp5en9HjJ8hYmjWF5DxpDyPnsoPAJHHJ2T5WopTjx+Twmex85EtUziyyV9JHkJQI5pcdBLWWscdhbFw/ZaX9qpFa37yf4vvbrFO3mHdVwYuKM2J2lczOZONNx/lqGlNP8A4vgXVOwKFG6MwUfOtu521h7S2qmPsRz1EvVsLkWEpGrmYkVVjgxl1bVcSruf/SbS/wADW6clCqQzDd+duZPIzvYIYaQctrGYs8CWwOoYKoTn5GWpqU7oOVYhkbXizPLZwX0zY6dg5Y17dmR/rI69kVbKVxun/TY6Px863ruKPH12SWWRnZnZyeSdYaBJG7NJKDpD8dilmdm+x3MsfR7UXrmIKglyR4hwypg/qnWJUXiON5omMOsa31p+tNvHpOHSSfZ9F4yD5bqLBdljVu3PbSLyepxd6FB65e3YBo5p/WSSMyCeNRuXcPrOw9ZEYYjaUt+Za0GwoLtGhHj5QrfHMGPR51mNexTiAjiidXY8X8nFSUF/OXFjMvdrNEevzjKgmnCkY4y2Sprw+rrGJ4lbUdSMEnSgKoC5iPv69eNMcWMl+SnP6gAUXsORUh/nUsbofXrGdvY41uPHz3EQQeQNu5S3HLFXuVXrSGGXDgGckQQsXazpYF9nYIv2HU1UMQQIwANWp40kAk8e01r4GN2rzhx6nqRhuSKsPA5MlsySBw8qxB5HTKoT/e3ZRGRLrQ3ZjpobHR4R6JwzLZBTrqe/Tgk6SRZKCUdaZeT5MidiANbD2Rjssk2TvxLYjjMIp1AnzrHVyBqHF/HA+llQ8iRUdHV2qPkF9+p6dm1JH7r2LrWcvIse7tm7eJjqtk9pZDHRtK6yfcAyWxEOIy7M3JeQInx47riHBxBTI/vERq1OeDqhSCjSuqfGup/OslZllLQ1S12uOzpwyBloRFsuRryRncPt+8j3bvmTH3IWrxyqjyl4RAzHjRh9S/LEn87AtJPiIxEpDWl1i6/wDrPZCSJ/o4DhLkSewWJcv1ZUneKnj2GWk37iHqmQ539SezMUghx9z9Rc0nebDYe5aylqbI5G0eCVEEh45Bnl/BLjj5Z/xzDuPI4Gyt7H4fzPjpWEeR8fbqxWYpD6HcEUlbICfX11GOdriDg685+QG3RuadY4kV266Zj8k0l4TWHd4a4KmaNxyzcf8kN10eRpyTxrOjmsNW+AnOoLctdxLBtbzjuDDssFzY1/bu6aP7hi/NW9/wCm9oW7tePhTwah5+NSgcaqkdDrDDvVC66Fft1ydK3C9SU5PAdPwBmB/wCcc3BzFwHJX4LyEKe3i/f1naWciyEf6pt0+7LV9uQluT3Fcnt106cHnVE8oQdvSjh49SKPzooD+Dr+fgR9jzrPgJXVReP9vjUg455i6E8H/rqP/8QANxEAAQMCBAMGBQIFBQAAAAAAAQACESExAxJBURAiYQQTcYGR8DJSobHBINEjM2Lh8XKCkpPC/9oACAEDAQk/ALSuixAOaMsVgakoQTE+RW5VlSbfumZy4wNKiuv+IqsDBdguP8sTmj/UTJJ3iCsYOzCSDcToeo21WG0z0+qwxnJr/dNAB1H5WlQfssRuWKge7ot7qRA1GyxTTwRp9k6BiXXwAQEVUYYnxg/hYDxhkEBxgS6KQPlm86VAThlmQBX1Kq6b7e9FQt03GywZA1B/snnK6HAjQEbbbjRPJvSPrPVHmMNWO8wCY8reCxXHMQI0FJonmNAKKpBAlWZM+nDEGHhMEkmw08ybALO1pmZblmQKDWE8losJ4Di0sOGAAZkU66LEGI0XgyWn7hWHMfx6mE9pwz8UAzC+FtvKyEN1KpUVO518ei7W7/rC7Qeag5NSmDFw2doc17nfDna05RlsQ0nNJoXQNFJJ9+4tbiIH6HEEES3Rw1B8U45XtzTNp38E8uBE13lfG409+CbHRfM38rdGe6cZjSAnnmeXZB8A2gb7nfi0RoEIHC/G+ESPWoRpCFG0H2TC1uICcuxm/Sbu6r5mcPicOX+o9DuLkFXMngLVQjgIhCCgrIVxHT5CiCMA6IGxAHSa+ZRJaSKbdR+yc4+Bj8UU/wAJwaMxzOJv5QIte/A0VBoUZBQssMgez5oXWoRrkJ9FIgmQWuBH/iPAon6Jx+iEDzR2QJnZAjDdlP8AuIgyOtI604WCEC6sPyrIe/xwFaq7eUfcqxseIqtk0Ezv0WC0BrjLi4UyCoG5r4bcNBKon1vVa2VSOFICZVxLiD1sm0n0VuAsoAFU0sBEgmBTfosUAuEua5p5gBpq0n5hPggBHLlAMDUCTU7lxRsv8p5EGOhB18Fhue4T900NJiBeN5O63Tc4DsrBNKamL18lBi23vZVJVQUUCVaK+FUYAPIDXzO8/aqwg0NmTcEEWEVWFDXs7smAXCBEidCKHULCc1rBEtoR6Co1WGe6Doa8i40JFwDYHdadAfuqeFB6cLoRml3qVYjiU4o8pcGk6TqGj7oh7BfKMpHUaQiSDUJxu5PcXOEhjYLjuTsOpXY8U4ZvJZaxB1r0TcrSSQLxtXpwNeD5yUMaHY9U7Tg4jfx2T+YVIB5gN4WE0TSQaidfJYrMBjY58wAEVmTEmawu39n7szLxiC2py3n2EX9qc2AMjSGwB8zoH0XZe6xHTDnkOAnXKNRpOqccV7okuMyZ+3SwXvw4O4viaOaatdtI1I3WCcM7jmE7xcLtDcRw0nm/4mqF4ImxhZu8M8sUEiKnUbcHz2bszjh4YnlMGr8u7nC/ygQtNI+v7Ba+7cBRxM/hCv6d+Dy07gkH1CxT2rs81wsQyY3Y+7T6pxLbOY48zD8p/BsU6MZze7w+jsTlB8gSfJE3IvJpa4mt6/o3PEcLrfiKpxOEYbiNFnM1MfM27TcEEaqnct719Y53iGzvDATGmYFUpMm5VB9VZXXj+r5uFY4//9k=';

const handleActionClick = (ev) => action('Card action clicked')(JSON.stringify(ev.detail));

export default function interActiveCard(dependencies) {
  const { React, ProfileCard } = dependencies;

  const randomUtcOffset = () => {
    let num = Math.floor(Math.random() * 12) + 1;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return num * 60;
  };

  const locationStates = {
    Past: () => -1920,
    Future: () => 1920,
    Random: () => randomUtcOffset(),
    Sydney: () => 600,
  };

  const locationsStrings = {
    Past: 'Somewhere, Past',
    Future: 'Anywhere, Future',
    Random: 'Random Place, World',
    Sydney: 'Sydney, Australia',
  };

  class ProfileCardInteractive extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        utcOffset: 600,
        use24h: false,
        avatarUrl: avatarImage,
        email: '',
        presence: 'online',
        fullname: 'Natalie Lindsey',
        mention: 'natalie',
        role: 'Senior Developer',
        location: 'Sydney',

        hasAvatar: true,
        hasMeta: true,
        hasLocation: true,
        hasTime: true,
        hasLongName: false,
        hasLongRole: false,
        hasAltActions: false,
      };

      this.actions = [
        {
          label: 'View',
          event: 'view',
        },
        {
          label: 'Chat',
          event: 'chat',
        },
      ];
    }

    createCheckboxBooleanAttribute(attribute) {
      return (
        <label>
          <input
            type="checkbox"
            onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
            checked={this.state[attribute]}
          />
          {attribute}
        </label>
      );
    }

    createRadioPresenceAttribute(attribute) {
      return (
        <label>
          <input
            type="radio"
            onChange={() => this.setState({ presence: attribute })}
            checked={this.state.presence === attribute}
          />
          {attribute}
        </label>
      );
    }

    createRadioLocationAttribute(attribute) {
      return (
        <label>
          <input
            type="radio"
            onChange={() => this.setState({
              location: attribute,
              utcOffset: locationStates[attribute](),
            })}
            checked={this.state.location === attribute}
          />
          {attribute}
        </label>
      );
    }

    render() {
      const customActions = [
        { event: 'foo', label: 'Foo' },
        { event: 'bar', label: 'Bar' },
        { event: 'baz', label: 'Baz' },
      ];

      const actions = this.state.hasAltActions ? customActions : this.actions;

      const role = this.state.hasLongRole ?
        'Sed do eiusmod tempor incididunt ut labore' :
        this.state.role;

      /* eslint-disable max-len */
      return (
        <div>
          <style>{"label {margin-right: 10px; -webkit-user-select: none;} legend {margin: 5px 0;}"}</style>

          <ProfileCard
            timestamp={this.state.hasTime ? getTimestampWithOffset(this.state.utcOffset) : null}
            use24h={this.state.use24h}
            avatarUrl={this.state.hasAvatar ? this.state.avatarUrl : ''}
            email={this.state.email}
            presence={this.state.presence}
            fullname={this.state.hasLongName ? `${this.state.fullname} Hathaway` : this.state.fullname}
            mention={this.state.mention}
            company={this.state.company}
            meta={this.state.hasMeta ? role : ''}
            location={this.state.hasLocation ? locationsStrings[this.state.location] : ''}
            actions={actions}
            onAction={handleActionClick}
          />

          <div>
            <br />
            <legend>
              {this.createCheckboxBooleanAttribute('use24h')}
              {this.createCheckboxBooleanAttribute('hasAvatar')}
              {this.createCheckboxBooleanAttribute('hasAltActions')}
              <br />
              {this.createCheckboxBooleanAttribute('hasMeta')}
              {this.createCheckboxBooleanAttribute('hasLocation')}
              {this.createCheckboxBooleanAttribute('hasTime')}
              <br />
              {this.createCheckboxBooleanAttribute('hasLongName')}
              {this.createCheckboxBooleanAttribute('hasLongRole')}
            </legend>
            <legend>
              {this.createRadioPresenceAttribute('online')}
              {this.createRadioPresenceAttribute('busy')}
              {this.createRadioPresenceAttribute('offline')}
              {this.createRadioPresenceAttribute('none')}
            </legend>
            <legend>
              {this.createRadioLocationAttribute('Past')}
              {this.createRadioLocationAttribute('Future')}
              {this.createRadioLocationAttribute('Random')}
              {this.createRadioLocationAttribute('Sydney')}
            </legend>
          </div>

        </div>
      );
    }
  }

  return ProfileCardInteractive;
}
