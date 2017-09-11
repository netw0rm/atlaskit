import { storyData as emojiStoryData } from '@atlaskit/editor-core/node_modules/@atlaskit/emoji/dist/es5/support';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';

export const mentionProvider = Promise.resolve(mentionStoryData.resourceProvider);
export const emojiProvider = Promise.resolve(emojiStoryData.getEmojiResource({ uploadSupported: true }));
export const testImageUrl = 'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAEydJREFUaAW1WgmUVNWZ/uq92nqt3ugF6IVuGrppoJud2MYlqCEgoiHGOI4LMypKTvRI1NE4ORmIHiNmjFFxdEbBOOpxxBlcQNRjDmBCGKdFtmZp6IVe6YZeq9daXr35/lv1qhcB0aP39Kt3313+//7r/e9/24ZvVuycZvIxrOlziuJmQDcXhEKYPegzpvZ4jcxT7cF09qfIGJsNHZmp9tNJiXqry6VX8XtvCNpnB470HbZg8K1H6lG4I/rOW7Wdt/fLnaMQTc5xTnO7tZsGBoxrapsCJRz+deGFJmc7DsXE6O/29Zlv1LX4qiIoBY8wKhT5/srX10EsUggKxPQU+/dSk/QHjtb6lvNTk7a50+Ow7Iqc4IypyZiYFWdLTXLC7dY1XdcUjlDIDA0MBM3OHp/Z0NKPg8e68O5H9fYDVYMyHXYdwcIc95YznUPr23vwuWpkM98KZ+T7nK8LIUTGyCPcyS3Idj5xuiNwQ++AMAx48uEZwR+UZ9km5yRoiYlOG+ykS41mf3iIGqd+pF3okvZACD1en3mivjf0yV9bzIfXH5ZFIyVRA9XvNUr4IX428xHpCO6x0Ng0XAT0+YoAUfqaEIvbM9Kcz1Y3+N1sM//j8TnGkssn6OPHx9ugE0wwBNMwQc4Pw2OzhUC1jujSSJBN5gnhnNvc0m++/0mjcfev9wlOW2GOs6/xlP/nQwG8GgEYXcswguGahWe4ZbgWFWt2pr5xcMhc2d4dwkOrCv1331zkyMlLsAmPQn4SYJo05jCoyGsYyrlqnCt0WXM1p9JQ1NX1mM+9cizw1MYaZ1aaDk3DC82njbsjYM5JzLkIsYhwFmQ7PqppDFxGQIFtG7+viRSEi4Yv7FiEs99GsSSpu3TFHJHOtat2C632SROdH9Y1+ZeyLip2VmLOtgproLMw1/npiXr/Ak72H/pwsXP6jFSYJECQflsEEPaoYsG2kaADB86YZUs+DnCAk95tV3Vj4HLWhTgR3yiPFpYnWyNFCFOsFkkIEcUFbn/9X5cpIoKDQaoCoXxLUrCQjnwLbMFhEFdp6Thbza6lzvgYm59EXJo/0bktMlaIGCWEUR/sVJTSJjY1thq38dt/8i/LnLl5CQgQsEWA2MMF2wKBnK2IbciCR5axcA06D3usHTUnujH5sm1+jnWOT9efbzlt/Jx1S3MUiJESEbsIJbhx+5DPvI31wIHtP3TmFnooTBsccTHQY9zQ3Q5o9DaWTisoX+NHFi+P5tAJzxmGKXBjCNcehmsRqBNPcCCIgsIk7Nt2lYNoqBJY7XTiJtZFc5TLFvSWRCzqcrlbH6WLjdn68sXG0mX5emeLH5XHGlFbtxs6RxVMWoCZxdmI9ziVUSogFhT5OE8R4nWH8M6OppZBHD5WjeZT++F0ODEpdxZKpk5AUmoMTL9BYoc9oZoXY8eW9+uMH9/1N52266XaTyWgVj5Ki4QAKfJhcrN7sabRX/bgHZP9q/+hxLFzVyumXfkeXnk7CcmTb8WxtgX45St9+OSd9zC9MAM52fEwI/vGV6maWoxLQ1eXifXPvoHlq45ga/UcJKSswMHGUtz/fDc+eHc3JqY7UTjJQ6lrSupht05OUc2m5nu07p4B//Zd7bH52Y60Lm/oXWvtwkvlajNSHAuH/ME9PX2m2fb5tWhrD9pmLt6Kt97ajKVLFiM2Lp5Dgc1vvYmf3nAjazq2b7oIi6/IpmSM6D6iBo35CROh41RLAOMXbEb5lX+HF556CFMKC+F0uTjahoMH99O4Z6mZj/1yOh5YVQIHpSdzhUkKhltHTXWPSXuxpSVp1LPQ7O5u7OMkkh12Z0hJ0h4kEXj193MNT0K8ImLTpldw/fU/iRJRWVmpiJicl4mJGTp+tPIvOHykE5rLfk6bEX3Xue/09wIXk4h71jyMHds2Yvr0GSRCggQbhoZ8ePrpZxUR88uy8ci/VuKl/zoe1hPVyiq9mTFkoKDAY3tubVlANufMFPf9kW6lUkYOo9hIAIirr8jTP9p5kP2X48afXa/GBYPhuG3v3r3qW3clwW4X2xuHpzdWQdyyGKZlpGpQ5Ed0nYPx2n/vQG3+VXji0UfIaRcMQ/aj8FbQ3NyETZs2Ii8vD19UtqJ02gSs/vU+HFJMCktlJMxli7KVkTc0+1bk5Ljz2WeIRJDIUJwv7Q//PDOQ5Im1rVl1EJvfvgcud6xCpjFOkCKIpAT8Ppxs7mftDDlXh2M1XoBqoBatRoR/5FuMu7M9gLt+fQq7//M3cMfEKSJ0eg4rrElJUUcWnDx5EllZWThwRGJF4O3tjSq4tPYWeUtIlDMx3rZuzbTggM90Jbkgeq4kgsFBY5l8XHXJBK2zexA1rM+ZNVOaVLEQlpeXY8OGDfRgdar9LdrLylX3Y0/FdmpI1BNGZoXdrEjj0FEZPxdlpWGYFmMErhCbnJyMPXv2ICcnB42NDfjtb9fh/fe3Yt0zR9DeFSDoqAWEmUXmXHnxeLFvDPpCcpSAXU52e4/1T6dLQ0FuonairoPNU5CSGuaSILMQ2rmo1atXY8WKFaotPT0d3v4gKug77rhVU0YpQEcXHUerPsPd9/wqamsWY2ScVV+4cCEOHTqEnp4eZGdno9fbo8Ccbu9DWjpdsikORcazmdHylEkJ2qQJDpxo8JeWFbsKNTmeCrwblk0KuhKctoEBHnQSx8PBRUsRjlkqIzot9YyMDAgRUjyJCWg9xXF0j2GCVbP6UUhpIqfPANkTM1WbBcOCa72lPTExUREhA5XUMi6Dt5deQgFS0/lDKRJXssdl++nVubIpOnXNPk+TM7YMKS2iBLiz6nYn4G0DD3TSrADKAuUR4BYHh4kzabzDuEbiJA2qSL/fL7HfaHgWXAu2GhD5UYS09VMzR6uswFcumWF/WXGqQkEPPdsuiQKZmzMhTil1ajJDEuxAS3MLCqfEw+fz8VCn1DGCgsOkRsm4XE7U1NSiuITfZILpG96N1WAZaDO5a6fijd1H4BvqJzPoqjnXgqiGqMHhH+lzcW9pbZVNuwKpyTTfiHcbMUxxLmci18ziD4SK7JLtkI/UJBcDmxB4CsRl84CpRTehrDwHnf0BIrfQykgWYhfaErkNHPjbVmzbWM6GgNA2WgvU2CBmlszDjfe9jMKqJp7jXQgQT5QSBXD4R7idEufA/t3NKJ0CZI4jEiMU1YToSOJKoXrJd19fQFk+NRhpLZ8tD2VlxXG7DOF4XS9OtXVwbxji4sYQEYUUXotpS8TMojR4JPZSdjI8QAgTz+2ny9zHPcHv62KnqPW5YcpsypbLcCEzPRVFBZ6wKo2YonZ5nlcaGnpDueXva4mxtlpRQOWeyHW1WRjkyJQpHkwpluYRswXDWQu5yxBlLBEyVKQmxDipzwvmZ7Bh/FkhnL2RE2XTJBPGaHZ4WQKXbliKd8BMHG1J0krkcowNhS4oCyMzlNitRauGMT/ECZMqyt1tTM/5P0Wlv6TWZ59i2rmADnJtHCUhborbs6gDvRfD5ihLzz75u28VSYs5jVUM4QzbRGWleOJtXrukMZnaHDfI5JmlSaIOe/a0otvrQ4zbTvXgXiIUXkChoz7/KOk+Hyj2Cz7R9IVl4xBDhip3OxYsqRsY5JpZkhLtPXbJxZKQEskAFkRJN/Hhzib87t+OI0ADDhfRR+HAWIiRbvWyxo5s+yb18Dnvs3euwPy5GTCHgkp9R0HiMjq66e9Z4uPszXZJKLO+qIFB4Ly5w0PX3T8b96ychvKbt2Bp30JMTPCQKIYJ5yVkeP43rYk0nPEa1uzdj4qDpzF/dvqXVUuAc1x9U59C43JoVWIjKjY/WNWFFQFD2YdsSpLaFLVKpj/wHqGR5jLy9NH4vukKL3AefRS9jYYlSMMXx87AoJ3IEcGyFbU0rs1ULr1DqQc37L2apPaJI/QOE8rdXr8paUzpDTE3G8cMxqJ5uTiATvo6kSIthZ3f7UMc3GrS4UZNUzcji7HWTlPmebCTavX6lpOigz7TFqjQ5H5CUvsHmRWvPtkbkiyiUK1iKfr/i8oymRqvQ0CntEiiUkrO/q6KYjGB24mtfzDATX00RlmbhENVtd7QqXYDU/Kc+/dW+mqUpsj9hCzsz7tbQrKzW4EhgyLMKkmTLrSc6YWdKRyRyndeSM0QT+RpnhgGjRZpYdRqbdSWjz9tVguhjW+R9ShC5JJF7iceWn/Y0cSsuJVQll11fFYcHnuwGM90VANxFPN5QpazEsh12JzMYcU6oMcxj8VHYw5L1ONcxUZ+1aEPxfmpcDMUsTI1YruyNhp5aO0zx+yeONtgn9d8U+AINF1uigrz3IqybX9ujG7pSr1oM9cvzuewDpwa7OWJVvbMC5OKWjBVdai+Ez01J9BdfZjPEfTVNsDo8Smi1OlvBDgbGRVwBLEb1SiflamYYO0janfg2C0f1kvAhqx0x+a6U0P1rCq5Kaed5sHckKlVdHpDZu2nV2PSpESbhCrqrMDFPL5hH361vh7ri8thSOw3QuICNFpkUSReo8frq6mnrscjd8X3kFWQj9j4eBhMZHS2taG+4gDOfFGBuMR82NNiEOr3wyRbHZqOk0YnNrRWoGnPckzg8SJEbyq2oTMddLyq25y66ANbRqrOINSY0dWHSsEosZZQp8t1V/5E/TUS8vfPvXLU/+Qj85wSqgg3ZNG3XFdIQo7iaMcZlLgy4eOCxPhHFWKz0Y5Mht1eSmDe6pWYd+nlGDcuAw7mOa0NIcT9qH95L6qrjmDHy6/DW1mP2IIshLw07gwDGyor8Oza0igRsgDJcgYHDTz10mEJ2JyxMdq/t3UYQoTQEBRpSJEVmczc/R9viu7ctrM9ZnaJxyialqKZNH45WnpS3ZhdlIh/erMC83IyETfgQtAmXn+YGFETGTt06gx+/PQ6XHbVEiTw+CoqKukfkUbIkIw+D09uN8bn5KH4ovloGWxH2559SMgfh+2VVWjN7samfylneMK7EmEk/yR3tnlrncErOgfzC528s7mOax6QxbOYFiEcqijr4Q1tc1qKft1Lb9WHrrsiy5Y1McEmewoPepKypBcJYu27X+Di3Gy4BxyjiBF18jZW4yd/fAxlCy5SaSMhQNRz7CNn9GDAj7i4BEyfOxdtQx34nx2v4hN0Y//mxcjNTeBmSCbKwhhvVextM394y6dmdqZda2gN3EpeyIWppVFhr8UGKWLkutzZ0aG8wLpdLlkkpS+p/aC4ZaraA3fMxOpbcvCbwzsxkOqDi2kg4bDGU11P7XFcdO9dKJ0zH4EhJjFYrNSP+oj8yHh55Dxuo/Po6DyNnQ0N+Jj9e99bjJKSVHWUsIio4g3w/OWfiErpFOpT5M1mqfOJOiZLImwbLr395jZedy3s9hpTX36z2n/Dkmw9jW5Y7kicNLgfLBjPw0w/nvj4AMompMOj01gHSWivA8seuItpHxoosQkRsmCrKALIY15a02aomkz0ffq/OzDzzmuwr/coqj5YhukzkxGUIJGTRBJCRNGiD/z8dOaNt29pagv+owVv5HtYwYdbhThxANrkHMeO6obAJaz75X6irGycTW6SJJcrZ4EXXj+Ke9cexI8wE9PQhUtW34lrbr6dfApQtyV1pNRbwrawZEiAtAwO9KLy+BE899JreHXfFqxdU4Rf3DIDyWkOBHgf4iB8JnnwOdVpXlgSvMt08i7Tv5gApMi2IaF4tJxNIsJCaQ919oT+xOuu+V1eo+jFN2qM0ikJZlFBkiZGTQ+LBbPSsfiSDHzW34CNx5thD2UhI5N5YXbyHwVUAAo6BH/Qj66+HlTX12Hbrp24efXv8bsPnkRJ+TH86cmr8bNleQxQNQQYVzm4cQZpk5t5FyI2wXU4KIl36poDKhtqrY3vUeVsErEGWJIBr7s2kJGrW84YuPfWfP8vVhY7CvI9YYdFCIO9AVRW9eC9Hbvw6B99an4sLsWCSRKC88qgth3t2Mn2EK5cBNy4uAjls6ciPycWdpcEqLSxyPn7+Ilu86mXDwdefKPemZ1B2zTwB56X1kQWFV1T5Dv6Oh8hMigqQjevu7KznM/zpihROiS1L1lx5sNsoGtUSu034e0xeLfSi9OdXejr71M5rBgmw1M8Hv7rRwLzVG44YoiWkoqe0+iyTzb2mu981BC879GDkuaHuNjaJv9dEcOWpuha5GNs+SpCZLyMESBiN5m8KXrc22vcJvcTUtbdNy145ff5Lxx5iZrkxmx0weq/Gaz9Rdm6/PARo5F9gSdUOWfIsUGiWAkAJXYSeLJjy2ZX1xR4hJ/tfJSa8y1AzlkuhBBrsiBS7i4pCbPkkkXuJyS1LwMkoXz90lyjtDjFzJkQz4sjly02xm5zyNGNJRA0zUGesTvkn2p4stt3pMP2Gs8TrQzFpUgAKLFT2xn/k5GwQ5qjOOXjfOXrECJwRDIyR2GXSxa5nxjwh66trveXsl2pBd8XWnxynpBQXKLYSAAoc4UAEfkozyQd5ypflxALjohbSpidrEhqX7Li1Jw5zMVOlTRmV4/hkeSZDJSUDbMd3UwUtPCMfUyOp3Kyk0OR9EeKECAqFIVrdXzV+/8BhDQqJo+UIYgAAAAASUVORK5CYII=';
export const testImageName = 'hipchat-logo.svg';
