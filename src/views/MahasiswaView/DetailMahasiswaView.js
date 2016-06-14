import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Menu from '../../components/Menu/Menu'
import TopMenu from '../../components/Menu/TopMenu'
import Mahasiswa from '../../components/Mahasiswa/Mahasiswa'
import { reduxForm } from 'redux-form'

import { getMahasiswaDataByNim } from '../../redux/modules/mahasiswa'
import { getKelas } from '../../redux/modules/kelas'
import { getAkademik } from '../../redux/modules/akademik'
import { getSemester } from '../../redux/modules/semester'

const form = 'formMahasiswa'
const fields = ['nimOnDelete']

const mapStateToProps = (state) => ({
  data: state.mahasiswa.data,
  nim: state.mahasiswa.nim,
  kelas: state.kelas.data,
  semester: state.semester.data,
  akademik: state.akademik.data,
  isLoading: state.mahasiswa.isLoadingData
})

export class DetailMahasiswaView extends Component {
  static propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    nim: PropTypes.string
  }

  handleHapusData = (nim) => {
    let { dispatch } = this.props
    $('.ui.modal')
    .modal('show')
    console.log(nim)
    dispatch(nimOnDelete(nim))
  }

  componentWillMount () {
    this.props.dispatch(getMahasiswaDataByNim(this.props.params.nim))
    this.props.dispatch(getKelas())
    this.props.dispatch(getSemester())
    this.props.dispatch(getAkademik())
  }
  render () {
    if (this.props.data) {
      var dataMahasiswa = this.props.data
    }
    return (
      <div>
        <Menu />
        <div className='main-panel'>
          <TopMenu />
          <div className='content'>
            <div className='content-fluid'>
            <h4 className='title text-center'>Detil Mahasiswa</h4>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                            <h4 className='title'>Informasi Diri</h4>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-6'>
                              <label>Nama</label>
                              <p>{dataMahasiswa.nama_mhs}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Email</label>
                              <p>{dataMahasiswa.email}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Tanggal Lahir</label>
                              <p>{dataMahasiswa.tanggal_lahir}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Nomor Handphone</label>
                              <p>{dataMahasiswa.no_hp}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Alamat Rumah</label>
                              <p>{dataMahasiswa.alamat_rumah}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Alamat Tinggal</label>
                              <p>{dataMahasiswa.alamat_tinggal}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='tab-content'>
                    <div className='tab-pane active' id='description-logo'>
                      <div className='card'>
                        <div className='header'>
                            <h4 className='title'>Detil Pendidikan</h4>
                        </div>
                        <div className='content'>
                          <div className='row'>
                            <div className='form-group col-md-6'>
                              <label>NIM</label>
                              <p>{dataMahasiswa.nim}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Kelas</label>
                              <p>{dataMahasiswa.kelas}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Akademik</label>
                              <p>{dataMahasiswa.akademik}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Semester</label>
                              <p>{dataMahasiswa.semester}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Tahun Masuk</label>
                              <p>{dataMahasiswa.tahun_masuk}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Device ID</label>
                              <p>{dataMahasiswa.device_id}</p>
                            </div>
                            <div className='form-group col-md-6'>
                              <label>Jumlah Kompensasi</label>
                              <p>{dataMahasiswa.kompensasi}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className='row'>
      //   <div className='ui grid container'>
      //     <Menu />
      //     <Mahasiswa
      //       nim={this.props.nim}
      //       data={this.props.data}
      //       isLoading={this.props.isLoading}/>
      //   </div>
      // </div>
    )
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: form,
  fields
})(DetailMahasiswaView))
