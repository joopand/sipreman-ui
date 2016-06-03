import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import Jurusan from '../../components/Jurusan/Jurusan'

import { getJurusan } from '../../redux/modules/jurusan'

const mapStateToProps = (state) => ({
  data: state.jurusan.data,
  isLoading: state.jurusan.isLoadingData
})

export class JurusanView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentWillMount () {
    this.props.dispatch(getJurusan())
  }
  render () {
    var row = []
    if (this.props.data) {
      var listJurusan = this.props.data.data
      for (var i = 0; i < listJurusan.length; i++) {
        row.push(
          <tr>
            <td><Link to={'jurusan/' + (listJurusan[i].kode)}>{listJurusan[i].kode}</Link></td>
            <td>{listJurusan[i].jurusan.toUpperCase()}</td>
            <td className='td-actions text-right'>
              <Link to={'/jurusan/' + listJurusan[i].kode + '/view'} className='btn btn-info btn-simple btn-xs'><i className='fa fa-user'></i></Link>
              <Link to={'/jurusan/' + listJurusan[i].kode + '/edit'} className='btn btn-success btn-simple btn-xs'><i className='fa fa-edit'></i></Link>
              <a onClick={this.delete} className='btn btn-danger btn-simple btn-xs'><i className='fa fa-times'></i></a>
            </td>
          </tr>
        )
      }
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Jurusan</h4>
                    </div>
                    <div className='content table-responsive'>
                      <div className='fixed-table-container'>
                        <table className='table table-hover'>
                          <thead>
                            <tr>
                              <th>Kode Jurusan</th>
                              <th>Nama Jurusan</th>
                              <th className='text-right'>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(JurusanView)
