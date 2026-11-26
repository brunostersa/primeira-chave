#!/bin/zsh
# Renderiza um Reel narrado: ./render-busca.sh <r> <voz.mp3> <dur> <t_cta>
SP=$TMPDIR_REELS; r=$1; voz=$2; dur=$3; cta=$4; Q=$SP/q-$r; rm -rf $Q
FERRAMENTAS=$SP/tools node ../07-rapidos/capturar.mjs $r $Q 30 && \
python3 ../05-salario-imovel-canteiro/som.py $Q/golpes.json $Q/trilha.wav $dur $(python3 -c "print($cta-.3)") && \
ffmpeg -loglevel error -y -framerate 30 -i $Q/q%05d.jpg -i $Q/trilha.wav -i $voz -filter_complex "[1]volume=0.22[t];[2]apad[v];[t][v]amix=inputs=2:duration=first:normalize=0[a]" -map 0:v -map "[a]" -c:v libx264 -pix_fmt yuv420p -crf 20 -c:a aac -b:a 160k -movflags +faststart reel-busca-${r#b-}.mp4 && echo OK $r && rm -rf $Q
