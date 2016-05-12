import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import DosenForm from '../../components/Dosen/DosenForm'

import { getDosenByNip } from '../../redux/modules/dosen'
import { getJabatan } from '../../redux/modules/jabatan'

const mapStateToProps = (state) => ({
  data: state.dosen.data,
  isLoading: state.dosen.isLoading,
  message: state.dosen.message,
  jabatan: state.jabatan.data
})

export class DosenEditView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.string,
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    jabatan: PropTypes.object
  }

  componentWillMount () {
    this.props.dispatch(getDosenByNip(this.props.params.nip))
    this.props.dispatch(getJabatan())
  }
  render () {
    return (
      <div>
        <TopMenu />
        <div className='row'>
          <div className='ui grid container'>
            <Menu />
            <DosenForm
              data={this.props.data}
              isLoading={this.props.isLoading}
              message={this.props.message}
              jabatan={this.props.jabatan}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DosenEditView)
