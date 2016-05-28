import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import EditProdiForm from '../../components/Prodi/EditProdiForm'

import { getProdiById } from '../../redux/modules/prodi'
import { getJurusan } from '../../redux/modules/jurusan'

const mapStateToProps = (state) => ({
  data: state.prodi.data,
  isLoading: state.prodi.isLoading,
  message: state.prodi.message,
  jurusan: state.jurusan.data
})

export class EditProdiView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jurusan: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getProdiById(this.props.params.id))
    this.props.dispatch(getJurusan())
  }
  render () {
    return (
      <div>
        <TopMenu />
        <div className='row'>
          <div className='ui grid container'>
            <Menu />
            <EditProdiForm
              data={this.props.data}
              isLoading={this.props.isLoading}
              message={this.props.message}
              jurusan={this.props.jurusan}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EditProdiView)
