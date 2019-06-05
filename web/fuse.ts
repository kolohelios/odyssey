import {
  FuseBox,
  StyledComponentsPlugin,
  WebIndexPlugin,
} from 'fuse-box'

const fuse = FuseBox.init({
  homeDir: '.',
  output: 'dist/$name.js',
  target: 'browser@es6',
  sourceMaps: true,
  useTypescriptCompiler: true,
  debug: true,
  plugins: [
    StyledComponentsPlugin({}),
    WebIndexPlugin(),
  ],
})

fuse.dev()

fuse.bundle('app').watch().hmr().instructions('> index.ts')

fuse.run()
